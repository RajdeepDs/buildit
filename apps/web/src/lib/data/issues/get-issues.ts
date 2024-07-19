"use server";

import { db, eq } from "@buildit/db";
import { issue, users } from "@buildit/db/src/schema";

import { getSession } from "../get-session";

export const getIssues = async () => {
  try {
    const session = await getSession();
    if (!session) return null;

    const workspaceId = await db.query.users.findFirst({
      where: eq(users.id, session?.id),
      columns: {},
      with: {
        workspaces: {
          columns: {
            id: true,
          },
        },
      },
    });

    if (!workspaceId?.workspaces[0]?.id) return null;

    const issues = await db.query.issue.findMany({
      where: eq(issue.workspaceId, workspaceId.workspaces[0]?.id),
      with: {
        reporter: true,
        assignee: true,
        workspace: true,
        project: true,
        team: true,
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
