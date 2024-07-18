"use server";

import { auth } from "@buildit/auth";
import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

export const getUser = async () => {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }
    const userId = session?.user.id || "";
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    return user;
  } catch {
    return null;
  }
};
