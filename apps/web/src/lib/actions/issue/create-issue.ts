"use server";

import type { z } from "zod";

import { db, eq } from "@buildit/db";
import { issue, workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { CreateIssueSchema } from "@/schemas/issue";

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

  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.slug, slug),
  });

  try {
    await db.insert(issue).values({
      title,
      description,
      status,
      priority,
      reporterId: isSession.id,
      issueId: Math.random().toString(36).substring(7),
      workspaceId: workspace?.id,
    });
    return { success: "Issue created" };
  } catch (error) {
    return { error: "Error creating issue" };
  }
};
