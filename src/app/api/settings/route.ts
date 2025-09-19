export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await prisma.setting.findMany({ orderBy: { key: "asc" } });
  return NextResponse.json({ settings: rows });
}

export async function PUT(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const entries = Object.entries(body as Record<string, string>);
  const ops = entries.map(([key, value]) =>
    prisma.setting.upsert({ where: { key }, create: { key, value }, update: { value } })
  );
  const saved = await prisma.$transaction(ops);
  return NextResponse.json({ settings: saved });
}


