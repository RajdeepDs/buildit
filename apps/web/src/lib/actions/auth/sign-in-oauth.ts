"use server";

import { signIn } from "@buildit/auth";

export const SignInWithOauth = async (provider: string) => {
  await signIn(provider);
};
