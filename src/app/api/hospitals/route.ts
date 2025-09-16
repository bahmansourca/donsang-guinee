export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const region = searchParams.get("region") || undefined;
  const where: any = {};
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (region) where.region = region;
  const hospitals = await prisma.hospital.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ hospitals });
}

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let payload: any = {};
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    payload = await req.json();
  } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const fd = await req.formData();
    payload = Object.fromEntries(fd.entries());
  }
  const { name, city, region, phone, email, latitude, longitude } = payload ?? {};
  if (!name || !city || !region) return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  const hospital = await prisma.hospital.create({
    data: {
      name,
      city,
      region,
      phone: phone || null,
      email: email || null,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
    },
  });
  return NextResponse.json({ hospital }, { status: 201 });
}


