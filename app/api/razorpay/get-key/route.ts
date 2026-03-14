import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const key = process.env.RAZORPAY_KEY_ID;

  if (!key) {
    return NextResponse.json(
      { error: "Razorpay key not configured" },
      { status: 500 }
    );
  }

  const allowedOrigins = [
    "https://hyosenebattery.in",
    "https://www.hyosenebattery.in",
    "http://localhost:3000",
  ];

  const origin = request.headers.get("origin");

  // Allow same-origin, whitelisted origins, and Vercel preview URLs
  const isLocal = origin === null;
  const isAllowed = origin && (
    allowedOrigins.includes(origin) ||
    origin.endsWith(".vercel.app")
  );

  if (!isLocal && !isAllowed) {
    console.warn("⚠️ Blocked suspicious origin:", origin);
    return NextResponse.json({ error: "Unauthorized origin" }, { status: 403 });
  }

  const response = NextResponse.json({ key }, { status: 200 });
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "same-origin");

  return response;
}
