import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function dbReady(): Promise<boolean> {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("johndoe")) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
