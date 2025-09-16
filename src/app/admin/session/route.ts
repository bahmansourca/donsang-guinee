import { NextRequest, NextResponse } from "next/server";
import { loginCookie, logoutCookie, shouldAllow } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  if (!shouldAllow(password)) return NextResponse.json({ error: "Mot de passe invalide" }, { status: 401 });
  loginCookie();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  logoutCookie();
  return NextResponse.json({ ok: true });
}


