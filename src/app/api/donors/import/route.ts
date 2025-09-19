export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

function parseCsv(text: string): Array<Record<string,string>> {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const headers = lines[0].split(",").map(h => h.trim());
  const rows: Array<Record<string,string>> = [];
  for (let i=1;i<lines.length;i++) {
    const cols = lines[i].split(",");
    const row: Record<string,string> = {};
    headers.forEach((h, idx) => row[h] = (cols[idx] || "").trim());
    rows.push(row);
  }
  return rows;
}

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  const text = await file.text();
  const rows = parseCsv(text);
  let created = 0;
  for (const r of rows) {
    const fullName = r.fullName || r.name || r.Nom || "";
    const bloodGroup = r.bloodGroup || r.groupe || r.Groupe || "";
    const phone = r.phone || r.telephone || r.Téléphone || "";
    const email = r.email || r.Email || "";
    const city = r.city || r.ville || r.Ville || "";
    const region = r.region || r.région || r.Region || "";
    if (!fullName || !bloodGroup || !phone || !city || !region) continue;
    const exist = await prisma.donor.findFirst({ where: { OR: [{ phone }, email ? { email } : undefined].filter(Boolean) as any } });
    if (exist) continue;
    await prisma.donor.create({ data: { fullName, bloodGroup, phone, email: email || null, city, region, verified: true } });
    created += 1;
  }
  return NextResponse.json({ ok: true, created, total: rows.length });
}


