"use server";

import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

export const getIssues = async () => {
  try {
    const issues = await db.query.issue.findMany({
      with: {
        reporter: true,
      },
    });
    return issues;
  } catch {
    return null;
  }
};

export const getIssueByIssueId = async ({ issueId }: { issueId: string }) => {
  try {
    const issueDetails = await db.query.issue.findFirst({
      where: eq(issue.issueId, issueId),
      with: {
        reporter: true,
      },
    });
    return issueDetails;
  } catch {
    return null;
  }
};
