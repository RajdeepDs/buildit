"use server";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { getSession } from "../data/get-session";

export const updateOnboarding = async () => {
  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized!" };
  }
  try {
    await db
      .update(users)
      .set({
        onboarding: true,
      })
      .where(eq(users.id, isSession.id));

    return { success: "Onboarding updated!" };
  } catch {
    return { error: "Error updating onboarding" };
  }
};
