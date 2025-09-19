export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateCode(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return String(n);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  let payload: any = {};
  if (contentType.includes("application/json")) {
    payload = await req.json();
  } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const fd = await req.formData();
    payload = Object.fromEntries(fd.entries());
  }

  const {
    fullName,
    bloodGroup,
    phone,
    email,
    city,
    region,
    channel, // "SMS" | "EMAIL"
  } = payload ?? {};

  if (!fullName || !bloodGroup || !phone || !city || !region) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const verificationChannel = (channel === "EMAIL" ? "EMAIL" : "SMS") as string;
  const verificationTarget = verificationChannel === "EMAIL" ? (email || null) : phone;

  // Upsert donor by phone or email to avoid duplicates
  let donor = await prisma.donor.findFirst({ where: { OR: [ { phone }, email ? { email } : undefined ].filter(Boolean) as any } });
  if (donor) {
    donor = await prisma.donor.update({
      where: { id: donor.id },
      data: {
        fullName,
        bloodGroup,
        phone,
        email: email || null,
        city,
        region,
        verified: false,
        verificationCode: code,
        verificationExpiresAt: expiresAt,
        verificationChannel,
        verificationTarget,
      },
    });
  } else {
    donor = await prisma.donor.create({
      data: {
        fullName,
        bloodGroup,
        phone,
        email: email || null,
        city,
        region,
        verified: false,
        verificationCode: code,
        verificationExpiresAt: expiresAt,
        verificationChannel,
        verificationTarget,
      },
    });
  }

  // Try enqueue message if OutboxMessage model exists
  try {
    // @ts-ignore: model may or may not exist; best-effort
    await (prisma as any).outboxMessage?.create?.({
      data: {
        channel: verificationChannel,
        to: verificationTarget || phone,
        subject: verificationChannel === "EMAIL" ? "Code de vérification" : null,
        body: `Votre code de vérification: ${code} (valide 10 min)`,
        donorId: donor.id,
      },
    });
  } catch (_e) {
    // Fallback: log only
    console.log("OTP for", verificationTarget || phone, code);
  }

  return NextResponse.json({ ok: true, donorId: donor.id });
}


