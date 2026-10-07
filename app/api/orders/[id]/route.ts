import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";

export async function PUT(req: Request, ctx: RouteContext<"/api/orders/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const item = await prisma.order.update({
    where: { id: Number(id) },
    data: { status: b.status !== undefined ? String(b.status) : undefined },
  });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, ctx: RouteContext<"/api/orders/[id]">) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.order.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
