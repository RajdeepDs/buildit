import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db } from "@buildit/db";

import { authConfig } from "./config";

export type { Session } from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  ...authConfig,
});