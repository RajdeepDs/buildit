"use server";

import { signIn } from "@buildit/auth";

export default async function magicLinkSignIn(formData: { email: string }) {
  await signIn("resend", formData);
}
