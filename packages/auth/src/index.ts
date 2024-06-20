import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { authConfig } from "./config";

export type { Session } from "next-auth";

export const runtime = "edge";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  events: {
    async linkAccount({ profile }) {
      await db
        .update(users)
        .set({
          image: profile.image,
        })
        .where(eq(users.email, profile.email!));
    },
  },
  adapter: DrizzleAdapter(db),
  ...authConfig,
});
