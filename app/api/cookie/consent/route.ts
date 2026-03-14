import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accepted } = await req.json();

    const response = NextResponse.json({ ok: true });

    // Store cookie securely for 1 year
    response.cookies.set("cookie_consent", accepted ? "true" : "false", {
       httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 year
    });

    return response;
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to set cookie" }, { status: 400 });
  }
}
