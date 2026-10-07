import { NextResponse } from "next/server";
import { prisma, dbReady } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

// Public: form landing bisa POST pesanan. Admin: GET list.
export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ items: [], dbLive: false });
  const items = await prisma.order.findMany({ orderBy: { id: "desc" }, take: 100 });
  return NextResponse.json({ items, dbLive: true });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (!b.nama) return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  const live = await dbReady().catch(() => false);
  if (!live) return NextResponse.json({ ok: true, offline: true });
  const item = await prisma.order.create({
    data: {
      nama: String(b.nama || ""),
      wa: String(b.wa || ""),
      paket: String(b.paket || ""),
      jumlah: Number(b.jumlah || 0),
      tanggal: String(b.tanggal || ""),
      catatan: String(b.catatan || ""),
      status: "BARU",
    },
  });
  return NextResponse.json({ item });
}
