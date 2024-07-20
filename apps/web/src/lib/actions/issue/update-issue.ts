"use server";

import type { z } from "zod";

import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { UpdateIssueSchema } from "@/schemas/issue";

export const updateIssue = async ({
  title,
  description,
  issueId,
}: z.infer<typeof UpdateIssueSchema>) => {
  const validateFields = UpdateIssueSchema.parse({
    title,
    description,
    issueId,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized" };
  }

  try {
    await db
      .update(issue)
      .set({ title, description, updatedAt: new Date() })
      .where(eq(issue.issueId, issueId));
    return { success: "Issue updated!" };
  } catch {
    return { error: "Error creating issue" };
  }
};
