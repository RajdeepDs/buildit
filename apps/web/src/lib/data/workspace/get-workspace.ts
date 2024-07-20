"use server";

import { db, eq } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

export const getWorkspace = async ({
  workspaceSlug,
}: {
  workspaceSlug: string;
}) => {
  try {
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, workspaceSlug),
      with: {
        teams: true,
        user: true,
      },
    });
    return workspace;
  } catch {
    return null;
  }
};
