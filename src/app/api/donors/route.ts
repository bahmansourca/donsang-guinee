export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const bloodGroup = searchParams.get("bloodGroup") || undefined;
  const where: any = {};
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (bloodGroup) where.bloodGroup = bloodGroup;
  const donors = await prisma.donor.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ donors });
}

export async function POST(req: NextRequest) {
  let payload: any = {};
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    payload = await req.json();
  } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const fd = await req.formData();
    payload = Object.fromEntries(fd.entries());
  }
  const { fullName, bloodGroup, phone, email, city, region } = payload ?? {};
  if (!fullName || !bloodGroup || !phone || !city || !region) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }
  const donor = await prisma.donor.create({ data: { fullName, bloodGroup, phone, email: email || null, city, region } });
  return NextResponse.json({ donor }, { status: 201 });
}


