export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!isAdmin()) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const donors = await prisma.donor.findMany({ orderBy: { createdAt: "desc" } });

  const PDFDocument = (await import("pdfkit")).default as any;
  const doc = new PDFDocument({ size: "A4", margin: 36 });
  const stream = doc as unknown as NodeJS.ReadableStream;

  doc.fontSize(16).text("Liste des donneurs", { align: "left" });
  doc.moveDown(0.5);
  doc.fontSize(9).fillColor("#555").text(`Généré le ${new Date().toLocaleString()}`);
  doc.moveDown(1);
  doc.fillColor("#000");

  const headerY = doc.y;
  const cols = [
    { label: "Nom", w: 170 },
    { label: "Groupe", w: 60 },
    { label: "Téléphone", w: 120 },
    { label: "Email", w: 140 },
    { label: "Ville", w: 80 },
    { label: "Région", w: 80 },
  ];
  cols.forEach((c, i) => {
    const x = 36 + cols.slice(0, i).reduce((a, b) => a + b.w, 0);
    doc.fontSize(10).font("Helvetica-Bold").text(c.label, x, headerY, { width: c.w });
  });
  doc.moveDown(0.5);
  doc.font("Helvetica");
  doc.moveTo(36, doc.y).lineTo(559, doc.y).strokeColor("#ddd").stroke();

  let y = doc.y + 6;
  donors.forEach((d) => {
    const row = [
      d.fullName,
      d.bloodGroup.replace("_POS", "+").replace("_NEG", "-"),
      d.phone,
      d.email || "",
      d.city,
      d.region,
    ];
    row.forEach((v, i) => {
      const x = 36 + cols.slice(0, i).reduce((a, b) => a + b.w, 0);
      doc.fontSize(10).fillColor("#000").text(String(v), x, y, { width: cols[i].w });
    });
    y += 18;
    if (y > 780) {
      doc.addPage();
      y = 48;
    }
  });

  doc.end();

  return new Response(stream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=donneurs.pdf",
    },
  });
}


