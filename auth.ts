import { betterAuth } from "better-auth";
import { db } from "@/lib/db";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { sendMagicLinkEmail } from "./lib/mail";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await sendMagicLinkEmail(email, token, url);
      },
    }),
  ],
});
