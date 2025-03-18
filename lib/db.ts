import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const PrismaSingleton = () => {
  const neon = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(neon);
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: PrismaClient | undefined; // eslint-disable-line
}
export const db = globalThis.prisma ?? PrismaSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
