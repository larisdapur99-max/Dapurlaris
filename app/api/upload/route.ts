import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/requireAdmin";

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Sesi habis / belum login." }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size === 0)
    return NextResponse.json({ error: "Tidak ada file / file kosong." }, { status: 400 });
  if (!file.type.startsWith("image/"))
    return NextResponse.json({ error: "File harus gambar." }, { status: 400 });
  if (file.size > 8_000_000)
    return NextResponse.json({ error: "File melebihi 8MB." }, { status: 413 });
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
  const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, fname), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${fname}` });
}
