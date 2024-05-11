"use server";

import { signOut } from "@buildit/auth";

export const logout = async () => {
  await signOut();
};
