"use server";

import { signIn } from "@buildit/auth";

export default async function magicLinkSignIn(formData: { email: string }) {
  console.log(formData);
  await signIn("resend", formData);
}
