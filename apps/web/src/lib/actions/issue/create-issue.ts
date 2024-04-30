"use server";

import { z } from "zod";

import { db } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

import { getWorkspaceBySlug } from "@/lib/data/workspace/get-workspace";
import { getSession } from "@/lib/get-session";
import { CreateIssueSchema } from "@/schemas/issue";

export const createIssue = async ({
  title,
  description,
  slug,
}: z.infer<typeof CreateIssueSchema>) => {
  const validateFields = CreateIssueSchema.parse({
    title,
    description,
    slug,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized" };
  }

  const workspace = await getWorkspaceBySlug({ slug });
  if (!workspace) {
    return { error: "Workspace not found" };
  }
  try {
    await db.insert(issue).values({
      title,
      description,
      status: "open",
      reporterId: isSession.id,
      workspaceId: workspace.id,
      issueId: "BLDT-1",
    });
    return { success: "Workspace created" };
  } catch {
    return { error: "Error creating workspace" };
  }
};
