// ------------------------------------------------------------------
// Hardened additions applied ON TOP of user's server.js
// - Minimal, non-invasive security enhancements added as wrappers/middlewares
// - Core logic untouched; only added checks, tokens, and optional AV scan
// - Replace your existing server.js with this file (or merge the diffs)
// ------------------------------------------------------------------
require("dotenv").config();

// ---- Core libs
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mysql = require("mysql2/promise");
const hpp = require("hpp");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const crypto = require("crypto");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Optional: Sentry (enable by setting SENTRY_DSN env)
let Sentry = null;
if (process.env.SENTRY_DSN) {
  Sentry = require("@sentry/node");
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: 0.05,
  });
}

// ----------------------------------------------------
// 🔐 Startup: required envs validator (fail fast)
// ----------------------------------------------------
function ensureEnv(keys = []) {
  const missing = keys.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("❌ Missing required env vars:", missing);
    process.exit(1);
  }
}

// List of critical envs for production. Adjust as needed.
ensureEnv([
  "DB_HOST",
  "DB_USER",
  "DB_NAME",
  "DB_PASSWORD",
  // DB_SSL_CA is optional in local dev; if present it will be used
  // "DB_SSL_CA",
  "JWT_SECRET",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
]);

// ----------------------------------------------------
// 🔐 Initialize Firebase Admin (service account JSON must be in secret storage)
// ----------------------------------------------------
let serviceAccount;
try {
  // Check if Firebase service account is provided as environment variable (Railway deployment)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    console.log("📦 Loading Firebase service account from environment variable");
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else {
    // Fall back to file path for local development
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json";
    console.log("📁 Loading Firebase service account from file:", serviceAccountPath);
    serviceAccount = require(serviceAccountPath);
  }
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin initialized successfully");
} catch (e) {
  console.warn(
    "⚠ Firebase Admin init failed (no service account). Ensure service account is present in production if needed.",
    e && e.message
  );
}

// ----------------------------------------------------
// App & Middleware
// ----------------------------------------------------
const app = express();
app.disable("x-powered-by");

// Trust Railway's proxy (required for X-Forwarded-For headers)
// This allows express-rate-limit to correctly identify users behind Railway's load balancer
app.set("trust proxy", 1);

// ---------------- Helmet / CSP / HSTS / other headers

// Use helmet for common headers but disable its automatic CSP so we can
// set a stricter, per-request Content-Security-Policy below that includes
// a cryptographic nonce. Removing 'unsafe-inline' from script/style sources
// ensures inline scripts cannot execute unless explicitly allowed by a nonce.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Per-request CSP middleware: generate a secure nonce and set an explicit
// Content-Security-Policy header. The nonce is exposed on `res.locals.cspNonce`
// so other server-side renderers can inject it into inline script tags.
app.use((req, res, next) => {
  try {
    const nonce = crypto.randomBytes(16).toString("base64");

    const directives = [
      `default-src 'self'`,
      `base-uri 'self'`,
      // Allow scripts from self, analytics & Razorpay; allow only our nonce for inline scripts
      `script-src 'self' 'nonce-${nonce}' https://checkout.razorpay.com https://www.googletagmanager.com https://www.google-analytics.com`,
      `connect-src 'self' https://api.razorpay.com`,
      `img-src 'self' data: https:`,
      // Styles may require 'unsafe-inline' for some libraries; prefer removing it
      // but keep it here until the frontend is adjusted to use nonces or external CSS.
      `style-src 'self' 'unsafe-inline' https:`,
      `frame-src https://checkout.razorpay.com`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
    ];

    res.setHeader('Content-Security-Policy', directives.join('; '));
    // expose the nonce to downstream handlers (useful if this server renders HTML)
    res.locals.cspNonce = nonce;
  } catch (e) {
    // If CSP header generation fails for some reason, continue without blocking
    safeLog('CSP middleware error:', e && e.message ? e.message : e);
  }
  return next();
});

app.use(
  helmet.hsts({
    maxAge: 15552000, // 180 days
    includeSubDomains: true,
    preload: true,
  })
);
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(helmet.noSniff());
app.use(helmet.frameguard({ action: "deny" }));

// ---------------- other protections
app.use(hpp()); // prevent parameter pollution

// --- SECURITY CHANGE: reduce JSON body size
app.use(express.json({ limit: "5kb" })); // reduced from 10kb
app.use(cookieParser());

// logging (morgan) - in production send logs to a log aggregator
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

if (Sentry) app.use(Sentry.Handlers.requestHandler());

// ---------------- CORS (restrict origins)
const allowedOrigins = [
  "https://hyosenebattery.in",
  "https://www.hyosenebattery.in",
  "https://hyosene-battery-official-website-production.up.railway.app",
  "https://hyosene-backend.onrender.com",
  "https://hyosenebattery.in",
  "https://www.hyosenebattery.in",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST"],
  })
);

// ---------------- Rate limiting (global; will override with Redis store below if you have Redis)
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 200,
    message: "Too many requests. Try again later.",
  })
);

// ----------------------------------------------------
// Helper utils (minimal, non-invasive additions)
// ----------------------------------------------------
function safeLog(...args) {
  // Mask values that look like secrets
  const out = args.map((a) => {
    try {
      const s = String(a);
      return s.replace(/(password\s*[:=]\s*)([^,\s]+)/gi, "$1[REDACTED]");
    } catch (e) {
      return a;
    }
  });
  console.error.apply(console, out);
}

// CSRF protection / double-submit cookie helper
function generateRandomToken() {
  return crypto.randomBytes(24).toString("hex");
}

// Middleware: require either Authorization Bearer OR X-CSRF-Token that matches cookie
function requireAuthOrCsrf(req, res, next) {
  try {
    // If Authorization: Bearer present and valid, accept
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return next();
      } catch (e) {
        // fallthrough to CSRF check
      }
    }

    // Check double-submit CSRF token
    const tokenHeader = req.headers["x-csrf-token"] || req.headers["x-xsrf-token"];
    const cookieToken = req.cookies && req.cookies["XSRF-TOKEN"];
    if (tokenHeader && cookieToken && tokenHeader === cookieToken) {
      return next();
    }

    return res.status(403).json({ ok: false, error: "Missing auth or CSRF token" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Auth/CSRF middleware error" });
  }
}

// Antivirus scan helper (optional: best effort; not blocking startup if clamscan missing)
async function scanFileWithClam(filePath) {
  return new Promise((resolve) => {
    exec("which clamscan || true", (err, stdout) => {
      const clamscan = stdout && stdout.trim();
      if (!clamscan) {
        console.warn("⚠ ClamAV not found: skipping AV scan (install clamscan for production)");
        return resolve({ ok: true, scanned: false });
      }

      exec(`clamscan --no-summary ${filePath}`, (scanErr, scanOut, scanStderr) => {
        if (scanErr) {
          return resolve({ ok: false, scanned: true, output: scanOut || scanStderr });
        }
        return resolve({ ok: true, scanned: true, output: scanOut });
      });
    });
  });
}

// ----------------------------------------------------
// Keep original DB/init/upload paths but make small safety checks
// ----------------------------------------------------
const UPLOAD_DIR = path.resolve(__dirname, "../secure_uploads");
try {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { mode: 0o700, recursive: true });
} catch (e) {
  safeLog("❌ Could not create upload dir:", e.message || e);
  process.exit(1);
}

// ----------------------------------------------------
// MySQL Pool (use SSL CA if provided)
// ----------------------------------------------------
let db;
(async () => {
  try {
    const poolConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      connectionLimit: 10,
    };

    if (process.env.DB_SSL_CA) {
      try {
        poolConfig.ssl = { ca: fs.readFileSync(process.env.DB_SSL_CA), rejectUnauthorized: true };
      } catch (e) {
        safeLog("⚠ Could not read DB_SSL_CA file:", e.message || e);
      }
    }

    db = await mysql.createPool(poolConfig);
    // quick test
    try {
      const [rows] = await db.query("SELECT NOW() AS now");
      console.log("✅ MySQL connected, time:", rows[0].now);
    } catch (qErr) {
      safeLog("⚠ DB test query failed:", qErr && qErr.message ? qErr.message : qErr);
    }
  } catch (err) {
    safeLog("❌ MySQL Pool error:", err && err.message ? err.message : err);
    if (process.env.NODE_ENV === "production") process.exit(1);
  }
})();

// ----------------------------------------------------
// Redis-backed rate limiter optional (unchanged logic)
// ----------------------------------------------------
let createOrderLimiter = null;
if (process.env.REDIS_URL) {
  try {
    const RedisStore = require("rate-limit-redis");
    const Redis = require("ioredis");
    const redisClient = new Redis(process.env.REDIS_URL);
    createOrderLimiter = rateLimit({
      store: new RedisStore({ sendCommand: (...args) => redisClient.call(...args) }),
      windowMs: 60 * 1000,
      max: 5,
      message: "Too many payment requests. Please try later.",
    });
    console.log("✅ Redis rate limiter enabled");
  } catch (e) {
    safeLog("⚠ Redis rate limiter failed to initialize:", e && e.message ? e.message : e);
  }
} else {
  createOrderLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, message: "Too many payment requests. Please try later." });
}

// ----------------------------------------------------
// JWT middleware (accepts header Bearer OR httpOnly cookie)
// ----------------------------------------------------
function verifyJWT(req, res, next) {
  try {
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
    else if (req.cookies && req.cookies.token) token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No token provided" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid or expired token" });
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(500).json({ error: "Auth middleware error" });
  }
}

// ----------------------------------------------------
// Helper: sanitize/safe functions
// ----------------------------------------------------
function sanitizeString(s = "", maxLen = 500) {
  return String(s).replace(/<\/?[^>]+(>|$)/g, "").trim().slice(0, maxLen);
}

// ----------------------------------------------------
// LOGIN: verify Firebase ID token and set httpOnly cookie (hardening)
// Also sets a non-httpOnly XSRF cookie for double-submit CSRF protection
// ----------------------------------------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { firebaseToken } = req.body;
    if (!firebaseToken) return res.status(400).json({ error: "Firebase ID token required" });
    let decoded;
    try {
      decoded = await admin.auth().verifyIdToken(firebaseToken);
    } catch (e) {
      safeLog("Firebase token verify failed:", e && e.message ? e.message : e);
      return res.status(401).json({ error: "Invalid Firebase token" });
    }
    const userId = decoded.uid;
    const email = decoded.email;
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    // Use sameSite: 'none' for cross-origin cookies (frontend and backend on different domains)
    const cookieOptions = { 
      httpOnly: true, 
      secure: true, // Always secure for sameSite: 'none'
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    };
    res.cookie("token", token, cookieOptions);
    // generate a non-httpOnly token for double-submit CSRF
    const csrfToken = generateRandomToken();
    res.cookie("XSRF-TOKEN", csrfToken, { 
      httpOnly: false, 
      secure: true, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    return res.json({ ok: true, message: "Logged in" });
  } catch (err) {
    safeLog("Login error:", err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: "Login failed" });
  }
});

// ----------------------------------------------------
// GET /api/auth/me - Check current session
// ----------------------------------------------------
app.get("/api/auth/me", async (req, res) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({ ok: false, error: "Not authenticated" });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.json({ 
        ok: true, 
        user: { 
          uid: decoded.userId, 
          email: decoded.email 
        } 
      });
    } catch (e) {
      return res.status(401).json({ ok: false, error: "Invalid or expired token" });
    }
  } catch (err) {
    safeLog("/api/auth/me error:", err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ----------------------------------------------------
// POST /api/auth/logout - Clear session cookies
// ----------------------------------------------------
app.post("/api/auth/logout", async (req, res) => {
  try {
    res.clearCookie("token", { 
      httpOnly: true, 
      secure: true, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });
    res.clearCookie("XSRF-TOKEN", { 
      httpOnly: false, 
      secure: true, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });
    return res.json({ ok: true, message: "Logged out" });
  } catch (err) {
    safeLog("Logout error:", err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: "Logout failed" });
  }
});

// ----------------------------------------------------
// GET /api/csrf-token - Provide CSRF token for non-authenticated users
// ----------------------------------------------------
app.get("/api/csrf-token", async (req, res) => {
  try {
    // Generate a CSRF token and set it as a cookie
    const csrfToken = generateRandomToken();
    res.cookie("XSRF-TOKEN", csrfToken, { 
      httpOnly: false, 
      secure: true, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
    return res.json({ ok: true, csrfToken });
  } catch (err) {
    safeLog("CSRF token error:", err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: "Failed to generate CSRF token" });
  }
});

// ----------------------------------------------------
// Contact route — use express-validator and require CSRF/Auth for mutation
// ----------------------------------------------------
const { body, validationResult } = require("express-validator");
app.post(
  "/api/contact",
  requireAuthOrCsrf,
[
  body("full_name")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 2, max: 128 }).withMessage("Full name must be 2–128 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Full name can contain only letters and spaces"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 5, max: 2000 }).withMessage("Message must be 5–2000 characters"),

  body("country")
    .optional()
    .trim()
    .isLength({ max: 64 }).withMessage("Country too long")
    .matches(/^[A-Za-z\s]+$/).withMessage("Country can contain only letters and spaces"),

  body("phone")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isMobilePhone().withMessage("Invalid phone number"),

  body("job_title")
    .optional()
    .trim()
    .isLength({ max: 128 }).withMessage("Job title too long"),

  body("company")
    .optional()
    .trim()
    .isLength({ max: 128 }).withMessage("Company name too long"),
]
,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ ok: false, error: "Invalid input", details: errors.array() });

      const { full_name, country, email, phone, job_title, company, message } = req.body;
      if (!db) return res.status(500).json({ ok: false, error: "DB not available" });

      const sql = `INSERT INTO contact_form (full_name, country, email, phone, job_title, company, message, is_human) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.execute(sql, [sanitizeString(full_name, 128), sanitizeString(country, 64), sanitizeString(email, 254), sanitizeString(phone, 32), sanitizeString(job_title, 128), sanitizeString(company, 128), sanitizeString(message, 2000), 1]);
      return res.json({ ok: true, id: result.insertId });
    } catch (err) {
      safeLog("Contact API error:", err && err.message ? err.message : err);
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }
);

// ----------------------------------------------------
// Multer-based career route (uploads) — keep upload outside web root and scan
// ----------------------------------------------------
const multer = require("multer");
function safeFilename(original) {
  const base = path.basename(original || "file").replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(0, 120);
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}-${base}`;
}
const ALLOWED_MIMES = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
const upload = multer({
  storage: multer.diskStorage({ destination: UPLOAD_DIR, filename: (req, file, cb) => cb(null, safeFilename(file.originalname)) }),
  fileFilter: (req, file, cb) => cb(null, ALLOWED_MIMES.has(file.mimetype)),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post(
  "/api/career",
  requireAuthOrCsrf,
  upload.single("resume"),
[
  body("full_name")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 2, max: 128 }).withMessage("Full name must be 2–128 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Full name can only contain letters and spaces")
    .escape(),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 5, max: 2000 }).withMessage("Message must be 5–2000 characters")
    .escape(),

  body("country")
    .optional()
    .trim()
    .isLength({ max: 64 }).withMessage("Country name too long")
    .matches(/^[A-Za-z\s]*$/).withMessage("Country should contain only letters")
    .escape(),

  body("phone")
    .trim()
    .isLength({ min: 10, max: 10 }).withMessage("Phone must be 10 digits long")
    .isMobilePhone().withMessage("Invalid phone number")
    .escape(),

  body("job_title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 128 }).withMessage("Job title must be 2–128 characters")
    .escape(),

  body("company")
    .optional()
    .trim()
    .isLength({ min: 2, max: 128 }).withMessage("Company name must be 2–128 characters")
    .escape(),
]
,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file && req.file.path) try { fs.unlinkSync(req.file.path); } catch (e) {}
        return res.status(400).json({ ok: false, error: "Invalid input", details: errors.array() });
      }

      const { full_name, country, email, phone, job_title, company, message } = req.body;
      const resume_path = req.file ? req.file.path : null;
      const resume_filename = req.file ? req.file.filename : null;

      // Run AV scan (best-effort)
      if (resume_path) {
        const scan = await scanFileWithClam(resume_path);
        if (!scan.ok) {
          // quarantining file
          try { fs.unlinkSync(resume_path); } catch (e) {}
          return res.status(400).json({ ok: false, error: "Uploaded file failed antivirus scan" });
        }
      }

      if (!db) return res.status(500).json({ ok: false, error: "DB not available" });

      const sql = `INSERT INTO career (full_name, country, email, phone, job_title, company, message, resume_filename, resume_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.execute(sql, [String(full_name).slice(0, 128), String(country || "").slice(0, 64), String(email).slice(0, 254), String(phone || "").slice(0, 32), String(job_title || "").slice(0, 128), String(company || "").slice(0, 128), String(message).slice(0, 2000), resume_filename, resume_path]);

      return res.json({ ok: true, id: result.insertId });
    } catch (err) {
      safeLog("Career API error:", err && err.message ? err.message : err);
      if (req.file && req.file.path) try { fs.unlinkSync(req.file.path); } catch (e) {}
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }
);

// ----------------------------------------------------
// Razorpay verify-payment endpoint — require auth/CSRF
// ----------------------------------------------------
app.post("/api/razorpay/verify-payment", requireAuthOrCsrf, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) return res.status(400).json({ ok: false, error: "Missing Razorpay fields" });
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");
    if (expected !== razorpay_signature) return res.status(400).json({ ok: false, error: "Invalid signature" });
    // mark order paid in DB here if desired (avoid leaking DB errors to clients)
    return res.json({ ok: true, message: "Payment verified successfully" });
  } catch (err) {
    safeLog("Verify payment error:", err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ----------------------------------------------------
// Webhook route (keep raw body) - don't register this after body-parsing middlewares that mutate req.body
// ----------------------------------------------------
app.post("/api/razorpay/webhook", express.raw({ type: "*/*" }), async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) return res.status(500).end("Webhook secret not configured");
    const payload = req.body; // raw buffer
    const receivedSignature = req.headers["x-razorpay-signature"];
    const expected = crypto.createHmac("sha256", webhookSecret).update(payload).digest("hex");
    if (expected !== receivedSignature) return res.status(400).end("Invalid signature");
    const event = JSON.parse(payload.toString("utf8"));
    // TODO: idempotent processing
    return res.status(200).json({ ok: true });
  } catch (err) {
    safeLog("Webhook error:", err && err.message ? err.message : err);
    return res.status(500).end("Webhook processing error");
  }
});

// ----------------------------------------------------
// Health check & error handler & graceful shutdown (unchanged)
// ----------------------------------------------------
app.get("/health", (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.json({ ok: true, timestamp: new Date().toISOString() });
});

if (Sentry) app.use(Sentry.Handlers.errorHandler());
app.use((err, req, res, next) => {
  safeLog("Global error:", err && err.stack ? err.stack : err);
  res.status(500).json({ ok: false, error: "Unexpected server error" });
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT || 5000}`);
});

async function shutdown() {
  console.info("SIGTERM received: closing server...");
  try {
    if (db && db.end) { await db.end(); console.info("DB pool closed"); }
    server.close(() => { console.info("HTTP server closed"); process.exit(0); });
    setTimeout(() => { console.error("Forcing shutdown"); process.exit(1); }, 10000);
  } catch (e) {
    safeLog("Error during shutdown", e && e.message ? e.message : e);
    process.exit(1);
  }
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

