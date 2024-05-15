"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

export const DeleteIssueSchema = z.object({
  id: z.string(),
});

export const deleteIssue = async ({
  id,
}: z.infer<typeof DeleteIssueSchema>) => {
  const validateFields = DeleteIssueSchema.parse({
    id,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  const isIssuePresent = db.query.issue.findFirst({
    where: eq(issue.issueId, id),
  });

  if (!isIssuePresent) {
    return {
      error: "The issue is not present",
    };
  }

  try {
    await db.delete(issue).where(eq(issue.issueId, id));
    return { success: "Issue Deleted" };
  } catch (error) {
    return { error: "Error deleting issue" };
  }
};
