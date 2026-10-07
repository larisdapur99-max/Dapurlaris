import { NextResponse } from "next/server";
import { checkCredentials, signAdmin } from "@/lib/auth";
import { ADMIN_COOKIE } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  const { username, password } = await req.json().catch(() => ({}));
  if (!username || !password || !checkCredentials(username, password)) {
    return NextResponse.json({ error: "Username / password salah" }, { status: 401 });
  }
  const token = await signAdmin(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
