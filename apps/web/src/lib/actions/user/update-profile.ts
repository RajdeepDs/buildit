"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";

const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(160, "Bio must be less than 160 characters"),
});

export const updateProfile = async ({
  name,
  username,
  bio,
}: z.infer<typeof updateProfileSchema>) => {
  const validateFields = updateProfileSchema.parse({
    name,
    username,
    bio,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized!" };
  }

  try {
    await db
      .update(users)
      .set({ name, username, bio })
      .where(eq(users.id, isSession.id));

    return { success: "Profile updated successfully" };
  } catch (error) {
    return { error: "Error updating profile" };
  }
};
