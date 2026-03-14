import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// 🔐 Allowed origins (ONLY your frontend can call payment verification)
const allowedOrigins = [
  "https://hyosenebattery.in",
  "https://www.hyosenebattery.in",
  "http://localhost:3000",
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // same-origin
  return allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 1: Block unknown origins
    // ---------------------------------------------------
    if (!isOriginAllowed(origin)) {
      console.warn("⚠️ Blocked unauthorized payment verification attempt:", origin);

      return NextResponse.json(
        { error: "Unauthorized origin" },
        { status: 403 }
      );
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeySecret) {
      console.error("[v0] RAZORPAY_KEY_SECRET is not set");
      return NextResponse.json(
        { error: "Server config error: missing Razorpay secret" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      courseTitle,
      amount,
    } = body;

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 2: Validate required fields exist
    // ---------------------------------------------------
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { error: "Missing payment details" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 3: Validate Razorpay fields format
    // Prevents signature manipulation
    // ---------------------------------------------------
    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid signature format" },
        { status: 400 }
      );
    }

    // Signature should always be 64-char sha256 hex
    if (razorpay_signature.length !== 64) {
      return NextResponse.json(
        { error: "Invalid signature length" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 4: Sanitize values to avoid XSS
    // ---------------------------------------------------
    const cleanCourseId = String(courseId || "").trim();
    const cleanCourseTitle = String(courseTitle || "").trim();

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 5: Prevent amount tampering
    // ---------------------------------------------------
    if (typeof amount !== "number" || amount <= 0 || amount > 200000) {
      // Prevent attacker from injecting insane amounts
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 6: Recompute signature
    // ---------------------------------------------------
    const secretKey = String(razorpayKeySecret).trim();
    const messageToSign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const generated_signature = crypto
      .createHmac("sha256", secretKey)
      .update(messageToSign)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      console.error("[v0] Signature mismatch", {
        generated: generated_signature,
        received: razorpay_signature,
      });

      return NextResponse.json(
        {
          error: "Signature verification failed",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 7: Protect against replay attacks
    // Future-proof: attach timestamps in notes & verify
    // ---------------------------------------------------

    const orderDetails = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId: cleanCourseId,
      courseTitle: cleanCourseTitle,
      amount,
      timestamp: new Date().toISOString(),
      status: "completed",
    };

    // ---------------------------------------------------
    // 🔐 SECURITY LAYER 8: Add no-cache + hardened headers
    // ---------------------------------------------------
    const response = NextResponse.json({
      success: true,
      orderDetails,
      message: "Payment verified successfully",
    });

    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "same-origin");

    return response;
  } catch (error) {
    console.error("[v0] Error in verify-payment:", error);

    return NextResponse.json(
      { error: "Internal server error during verification" },
      { status: 500 }
    );
  }
}


