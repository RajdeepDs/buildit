"use server";

import { db, eq } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

export const getWorkspaceMembers = async ({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) => {
  try {
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, workspaceSlug),
      with: {
        user: true,
      },
    });
    return workspace?.user;
  } catch {
    return null;
  }
};
