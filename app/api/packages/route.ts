import { NextResponse } from "next/server";
import { prisma, dbReady } from "@/lib/db";
import { DEFAULT_PACKAGES } from "@/lib/defaults";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET() {
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ items: DEFAULT_PACKAGES, dbLive: false });
  const items = await prisma.package.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json({ items, dbLive: true });
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const item = await prisma.package.create({
    data: {
      nama: String(b.nama || ""),
      deskripsi: String(b.deskripsi || ""),
      hargaMulai: Number(b.hargaMulai || 0),
      hargaLabel: String(b.hargaLabel || ""),
      image: String(b.image || ""),
      urutan: Number(b.urutan || 0),
      aktif: b.aktif !== false,
    },
  });
  return NextResponse.json({ item });
}
