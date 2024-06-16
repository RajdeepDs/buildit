import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, eq } from "@buildit/db";
import { twoFactorConfirmations } from "@buildit/db/src/schema";

import { authConfig } from "./config";
import { getUserById } from "./data/get-user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export type { Session } from "next-auth";

export const runtime = "edge";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAUTH without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id ?? "");

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmationRes = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmationRes) {
          return false;
        }

        // Delete the two factor confirmation for next login
        await db
          .delete(twoFactorConfirmations)
          .where(eq(twoFactorConfirmations.userId, Number(existingUser.id)));
      }

      return true;
    },
  },
  adapter: DrizzleAdapter(db),
  ...authConfig,
});
