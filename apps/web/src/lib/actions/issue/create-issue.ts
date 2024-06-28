"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { issue, workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { CreateIssueSchema } from "@/schemas/issue";
import type { MutationResult, WorkspaceResponse } from "../types";

export const createIssue = async ({
  title,
  description,
  status,
  priority,
  slug,
  teamId,
}: z.infer<typeof CreateIssueSchema>): Promise<MutationResult> => {
  try {
    CreateIssueSchema.parse({
      title,
      description,
      status,
      priority,
      slug,
      teamId,
    });

    const user = await getSession();
    if (!user) {
      return { error: "Unauthorized!" };
    }

    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, slug!),
    });
    const workspaceCounter = workspace?.issueCounter;
    const issueCounter = workspaceCounter! + 1;
    console.log(issueCounter, "issueCounter");

    await db.insert(issue).values({
      title,
      description,
      status,
      priority,
      reporterId: user.id,
      issueId: "ISSUE-" + issueCounter,
      workspaceId: workspace?.id,
      teamId: teamId,
    });

    const workspaceRes: WorkspaceResponse = await db
      .update(workspaces)
      .set({
        issueCounter,
      })
      .where(eq(workspaces.slug, slug!))
      .returning();

    if (!workspaceRes || !workspaceRes[0]) {
      return { error: "Error updating workspace." };
    }

    return { success: "ISSUE-" + workspaceRes[0].issueCounter };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError ? "Invalid fields" : "Error creating issue",
    };
  }
};
