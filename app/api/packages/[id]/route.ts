import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: Request, ctx: RouteContext<"/api/packages/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const item = await prisma.package.update({
    where: { id: Number(id) },
    data: {
      nama: b.nama !== undefined ? String(b.nama) : undefined,
      deskripsi: b.deskripsi !== undefined ? String(b.deskripsi) : undefined,
      hargaMulai: b.hargaMulai !== undefined ? Number(b.hargaMulai) : undefined,
      hargaLabel: b.hargaLabel !== undefined ? String(b.hargaLabel) : undefined,
      image: b.image !== undefined ? String(b.image) : undefined,
      urutan: b.urutan !== undefined ? Number(b.urutan) : undefined,
      aktif: b.aktif !== undefined ? Boolean(b.aktif) : undefined,
    },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, ctx: RouteContext<"/api/packages/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.package.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
