"use server";

import { db } from "@buildit/db";

export const fetchIssues = async () => {
  const issues = await db.query.issue.findMany({
    with: {
      reporter: true,
    },
  });
  if (!issues) return { error: "No issues" };
  if (issues) return { success: issues };
};
