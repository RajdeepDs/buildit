import type { DefaultSession, NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

import { env } from "../env";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"] & {
        username: string | null;
        onboarding: boolean;
      };
  }
}

export const authConfig = {
  providers: [
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
