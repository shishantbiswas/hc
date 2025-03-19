import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { Pool } from "@neondatabase/serverless";
// "@neondatabase/serverless": "^0.10.4"


const PrismaSingleton = () => {
  // const neon = new Pool({ connectionString: process.env.DATABASE_URL });
  // const adapter = new PrismaNeon(neon);
  return new PrismaClient(); // disable neon driver for performance issues
};

declare global {
  var prisma: PrismaClient | undefined; // eslint-disable-line
}
export const db = globalThis.prisma ?? PrismaSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
