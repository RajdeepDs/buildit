import { db, eq } from "@buildit/db";
import { issue } from "@buildit/db/src/schema";

import { getSession } from "@/lib/get-session";

export async function getAllIssues() {
  const user = await getSession();
  if (!user) {
    return null;
  }
  try {
    const allIssues = await db.query.issue.findMany({
      where: eq(issue.reporterId, user.id),
    });
    return allIssues;
  } catch {
    return null;
  }
}

export async function getIssueByIssueId(issueId: string) {
  try {
    const IssueDetails = await db.query.issue.findFirst({
      where: eq(issue.issueId, issueId),
    });

    return IssueDetails;
  } catch {
    return null;
  }
}
