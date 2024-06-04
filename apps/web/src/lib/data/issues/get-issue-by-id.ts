"use server";

import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

export const getIssueByIssueId = async ({ id }: { id: string }) => {
  const res = await db.query.issue.findFirst({
    where: eq(issue.issueId, id),
    with: {
      reporter: true,
    },
  });
  if (!res) return { error: "No issues" };
  if (res) return { success: res };
};
