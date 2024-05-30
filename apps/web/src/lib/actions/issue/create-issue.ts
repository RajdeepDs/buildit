"use server";

import type { z } from "zod";

import { db, eq } from "@buildit/db";
import { issue, workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { CreateIssueSchema } from "@/schemas/issue";
import type { TWorkspace } from "@/types";

export const createIssue = async ({
  title,
  description,
  status,
  priority,
  slug,
}: z.infer<typeof CreateIssueSchema>) => {
  const validateFields = CreateIssueSchema.parse({
    title,
    description,
    status,
    priority,
    slug,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized" };
  }

  const workspace: TWorkspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.slug, slug),
  });
  const workspaceCounter = workspace?.issueCounter;
  const issueCounter = workspaceCounter! + 1;

  try {
    await db.insert(issue).values({
      title,
      description,
      status,
      priority,
      reporterId: isSession.id,
      issueId: "ISSUE-" + issueCounter,
      workspaceId: workspace?.id,
    });
    await db
      .update(workspaces)
      .set({ issueCounter })
      .where(eq(workspaces.slug, slug));
    return { success: "ISSUE-" + issueCounter };
  } catch (error) {
    return { error: "Error creating issue" };
  }
};
