export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const donors = await prisma.donor.findMany({ orderBy: { createdAt: "desc" } });
  const header = ["id","fullName","bloodGroup","phone","email","city","region","createdAt"].join(",");
  const rows = donors.map(d => [d.id,d.fullName,d.bloodGroup,d.phone,d.email ?? "",d.city,d.region,d.createdAt.toISOString()].join(","));
  return new NextResponse([header, ...rows].join("\n"), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=donneurs.csv" },
  });
}


