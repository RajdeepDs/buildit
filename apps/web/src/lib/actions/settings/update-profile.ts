"use server";

import type { z } from "zod";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { updateProfileSchema } from "@/schemas/settings";

export const updateProfile = async ({
  name,
  bio,
}: z.infer<typeof updateProfileSchema>) => {
  const validateFields = updateProfileSchema.parse({
    name,
    bio,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized" };
  }

  try {
    await db.update(users).set({ name, bio }).where(eq(users.id, isSession.id));
  } catch (error) {
    return { error: "Error updating profile" };
  }
};
