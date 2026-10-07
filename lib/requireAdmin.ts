import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/auth";

export const ADMIN_COOKIE = "dapur_admin";

export async function requireAdmin() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  const payload = await verifyAdmin(token);
  return payload;
}
