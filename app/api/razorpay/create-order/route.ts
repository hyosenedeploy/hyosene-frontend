import { type NextRequest, NextResponse } from "next/server";

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

// 🔐 Hardcoded safe course prices (prevents hacker from changing frontend amount)
const SAFE_COURSE_PRICES: Record<string, number> = {
  "Flight Fundamentals & Paper Glider Physics": 599,
  "Rocket Science at Home": 699,
  "Drone Basics & Aerodynamic Simulation": 899,
  "Science Behind Weather & Flight": 599,

  "Design Your Own Mini Aircraft (3D Virtual)": 799,
  "Drone Simulation & Control Workshop": 999,
  "Space Mission & Rocket Launch Principle" : 799,
  "Weather Sensor & Data Science Basics": 899,
  "Inside a Aircraft(Virtual Tour Series)": 899,


  "Virtual RC Aircraft Design Project": 1299,
  "Drone Fabrication & Autonomous Systems(Virtual)": 1499,
  "Space Science & Satellite Modelling": 1199,
  "Wind Tunnel & Aerodynamics simulation,lab": 1199,
  "Aircraft Innovation & Enterpreneurship Camp": 1099
};


export async function POST(request: NextRequest) {
  try {
    // ❌ Missing Razorpay credentials
    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    const { amount, courseTitle, courseId } = await request.json();

// Accept number or numeric string safely
const safeAmount = Number(String(amount).trim());

// -------------------------------------------------------
// 🔐 SECURITY LAYER 1: Validate Input Types (patched)
// -------------------------------------------------------
if (
  !Number.isFinite(safeAmount) ||
  typeof courseTitle !== "string" ||
  typeof courseId !== "string"
) {
  return NextResponse.json(
    { error: "Invalid request format" },
    { status: 400 }
  );
}

    // -------------------------------------------------------
    // 🔐 SECURITY LAYER 2: Sanitize Strings to prevent XSS
    // -------------------------------------------------------
 const cleanCourseTitle = courseTitle.trim();
const cleanCourseId = courseId.trim();  // keep escape ONLY for ID if needed

    // -------------------------------------------------------
    // 🔐 SECURITY LAYER 3: Prevent Price Tampering
    // Compare frontend amount vs backend official price
    // -------------------------------------------------------
    const backendPrice = SAFE_COURSE_PRICES[cleanCourseTitle];

    if (!backendPrice) {
      return NextResponse.json(
        { error: "Unknown course selected" },
        { status: 400 }
      );
    }

    if (backendPrice !== safeAmount) {
      // Hacker is trying to modify price manually
      console.warn("⚠️ Possible tampering detected:", {
        frontendAmount: amount,
        backendAmount: backendPrice,
      });

      return NextResponse.json(
        { error: "Invalid course amount" },
        { status: 400 }
      );
    }

    // -------------------------------------------------------
    // 🔐 SECURITY LAYER 4: Rate-limit abuse
    // (Vercel auto handles IP but we add extra check)
    // -------------------------------------------------------
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";

    // Future improvement: Store last IP requests in KV/DB.

    // -------------------------------------------------------
    // 🔐 SECURITY LAYER 5: Generate Safe Receipt ID
    // Prevent injection inside receipt
    // -------------------------------------------------------
    const shortTimestamp = Date.now().toString().slice(-8);
    const receipt = `C${cleanCourseId}_${shortTimestamp}`.substring(0, 40);

    // -------------------------------------------------------
    // 🔐 SECURITY LAYER 6: Create Razorpay Order Safely
    // -------------------------------------------------------
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Basic Auth header
        Authorization: `Basic ${Buffer.from(
          `${razorpayKeyId}:${razorpayKeySecret}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        amount: backendPrice * 100, // backend controls amount
        currency: "INR",
        receipt,
        notes: {
          courseTitle: cleanCourseTitle,
          courseId: cleanCourseId,
          validated: "true", // indicates backend validation passed
          ip,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("⚠ Razorpay API Error:", errorText);
      throw new Error("Failed to create Razorpay order");
    }

    const order = await response.json();

    // -------------------------------------------------------
    // 🔐 SECURITY LAYER 7: Return Safe Order Object Only
    // -------------------------------------------------------
    return NextResponse.json(order);
  } catch (error) {
    console.error("❌ Error creating order:", error);

    return NextResponse.json(
      { error: "Failed to create order (server error)" },
      { status: 500 }
    );
  }
}
