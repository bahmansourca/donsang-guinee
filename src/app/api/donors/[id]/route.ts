import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = params.id;
  const data = await req.json();
  const { fullName, bloodGroup, phone, email, city, region, isActive, lastDonationDate } = data ?? {};
  const updated = await prisma.donor.update({
    where: { id },
    data: {
      fullName,
      bloodGroup,
      phone,
      email,
      city,
      region,
      isActive,
      lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : null,
    },
  });
  return NextResponse.json({ donor: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.donor.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


