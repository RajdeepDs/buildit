"use server";

import { db, eq } from "@buildit/db";
import { users } from "@buildit/db/src/schema";

import { getUser } from "../user/get-user";

export const getWorkspaceByUserId = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const workspace = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      with: {
        workspaces: true,
      },
    });

    return workspace;
  } catch {
    return null;
  }
};
