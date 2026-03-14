import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const accepted = cookie.includes("cookie_consent=true");

  return NextResponse.json({ accepted });
}
