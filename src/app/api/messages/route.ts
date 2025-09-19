export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { sendSms } from "@/lib/sms";

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { channel, to, message } = body ?? {};
  if (!channel || !to || !message) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  if (channel === "SMS") {
    const r = await sendSms(to, message);
    if (!r.ok) return NextResponse.json({ error: r.error || "Erreur SMS" }, { status: 500 });
    return NextResponse.json({ ok: true });
  }
  // Email: placeholder
  console.log("EMAIL to", to, message);
  return NextResponse.json({ ok: true });
}


