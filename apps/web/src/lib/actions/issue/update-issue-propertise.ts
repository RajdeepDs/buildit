"use server";

import { updateIssuePropertiseSchema } from "@/schemas/issue";
import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";
import { z } from "zod";

export const updateIssuePropertise = async ({
  issueId,
  status,
  priority,
  assigneeId,
  projectId,
}: z.infer<typeof updateIssuePropertiseSchema>) => {
  const validateFields = updateIssuePropertiseSchema.parse({
    issueId,
    status,
    priority,
    assigneeId,
    projectId,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  try {
    await db
      .update(issue)
      .set({ status, priority, assigneeId, projectId, updatedAt: new Date() })
      .where(eq(issue.id, issueId));
    return { success: "Issue propertise updated!" };
  } catch {
    return { error: "Error updating issue propertise" };
  }
};
