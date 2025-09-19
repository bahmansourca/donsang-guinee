export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendSms } from "@/lib/sms";

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { channel, bloodGroup, region, message } = body ?? {};
  if (!channel || !message) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  const where: any = { verified: true };
  if (bloodGroup) where.bloodGroup = bloodGroup;
  if (region) where.region = region;
  const recipients = await prisma.donor.findMany({ where, select: { id: true, phone: true, email: true } });
  let count = 0;
  if (channel === "SMS") {
    for (const r of recipients) {
      if (!r.phone) continue;
      const res = await sendSms(r.phone, message);
      if (res.ok) count += 1;
    }
  } else {
    // Email placeholder
    recipients.forEach(r => console.log("EMAIL to", r.email));
    count = recipients.length;
  }
  return NextResponse.json({ ok: true, sent: count, total: recipients.length });
}


