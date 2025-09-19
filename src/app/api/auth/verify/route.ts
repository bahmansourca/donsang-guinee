export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { donorId, code } = body ?? {};
  if (!donorId || !code) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  const donor = await prisma.donor.findUnique({ where: { id: donorId } });
  if (!donor) return NextResponse.json({ error: "Donneur introuvable" }, { status: 404 });
  if (donor.verified) return NextResponse.json({ ok: true, already: true });
  const now = new Date();
  if (!donor.verificationCode || !donor.verificationExpiresAt || donor.verificationExpiresAt < now) {
    return NextResponse.json({ error: "Code expiré. Recommencez l’inscription." }, { status: 400 });
  }
  if (String(code).trim() !== donor.verificationCode) {
    return NextResponse.json({ error: "Code invalide" }, { status: 400 });
  }
  await prisma.donor.update({
    where: { id: donor.id },
    data: { verified: true, verificationCode: null, verificationExpiresAt: null },
  });
  return NextResponse.json({ ok: true });
}


