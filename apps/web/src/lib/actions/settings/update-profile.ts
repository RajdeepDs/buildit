"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { updateProfileSchema } from "@/schemas/settings";
import type { MutationResult } from "../types";

export const updateProfile = async ({
  name,
  bio,
}: z.infer<typeof updateProfileSchema>): Promise<MutationResult> => {
  try {
    updateProfileSchema.parse({ name, bio });

    const isSession = await getSession();
    if (!isSession) {
      return { error: "Unauthorized!" };
    }

    await db.update(users).set({ name, bio }).where(eq(users.id, isSession.id));
    return { success: "Profile updated successfully." };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError
          ? "Invalid fields"
          : "Error updating profile",
    };
  }
};
