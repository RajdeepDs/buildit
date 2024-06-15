"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";

const updateWorkspaceSchema = z.object({
  workspaceName: z.string(),
  workspaceURL: z.string().min(1, { message: "Workspace URL is required" }),
});

export const updateWorkspace = async ({
  workspaceName,
  workspaceURL,
}: z.infer<typeof updateWorkspaceSchema>) => {
  const validateFields = updateWorkspaceSchema.parse({
    workspaceName,
    workspaceURL,
  });

  if (!validateFields) {
    return { error: "Invalid fields!" };
  }

  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized!" };
  }

  try {
    await db
      .update(workspaces)
      .set({ name: workspaceName, slug: workspaceURL, updatedAt: new Date() })
      .where(eq(workspaces.userId, isSession.id));
    return workspaceURL;
  } catch (error) {
    return { error: "Error updating workspace!" };
  }
};
