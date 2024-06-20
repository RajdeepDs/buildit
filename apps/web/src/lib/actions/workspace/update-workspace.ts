"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { UpdateWorkspaceSchema } from "@/schemas/workspace";
import type { MutationResult } from "../types";

export const updateWorkspace = async ({
  workspaceName,
  workspaceURL,
}: z.infer<typeof UpdateWorkspaceSchema>): Promise<MutationResult> => {
  try {
    UpdateWorkspaceSchema.parse({ workspaceName, workspaceURL });

    const user = await getSession();
    if (!user) {
      return { error: "Unauthorized!" };
    }

    await db
      .update(workspaces)
      .set({ name: workspaceName, slug: workspaceURL, updatedAt: new Date() })
      .where(eq(workspaces.userId, user.id));
    return { success: workspaceURL };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError
          ? "Invalid fields"
          : "Error updating workspace",
    };
  }
};
