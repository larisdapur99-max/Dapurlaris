import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/requireAdmin";
import AdminShell from "./AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");
  return <AdminShell />;
}
