"use server";

import type { z } from "zod";

import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

import { DeleteIssueSchema } from "@/schemas/issue";

export const deleteIssue = async ({
  issueId,
}: z.infer<typeof DeleteIssueSchema>) => {
  const validateFields = DeleteIssueSchema.parse({
    issueId,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  try {
    await db.delete(issue).where(eq(issue.issueId, issueId));
    return { success: "Issue deleted!" };
  } catch {
    return { error: "Error deleting issue" };
  }
};
