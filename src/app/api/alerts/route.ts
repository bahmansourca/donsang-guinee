export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

// GET list alerts (optionally filter by status, region, bloodGroup)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined; // OPEN|RESOLVED|CANCELLED
  const region = searchParams.get("region") || undefined;
  const bloodGroup = searchParams.get("bloodGroup") || undefined;
  const where: any = {};
  if (status) where.status = status;
  if (region) where.region = region;
  if (bloodGroup) where.bloodGroup = bloodGroup;
  const alerts = await prisma.alert.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ alerts });
}

// POST create alert (admin)
export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let body: any = {};
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) body = await req.json();
  else if (ct.includes("form")) body = Object.fromEntries((await req.formData()).entries());
  const { title, content, bloodGroup, region } = body ?? {};
  if (!title || !content || !bloodGroup || !region) return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  const alert = await prisma.alert.create({ data: { title, content, bloodGroup, region, status: "OPEN" } });
  return NextResponse.json({ alert }, { status: 201 });
}


