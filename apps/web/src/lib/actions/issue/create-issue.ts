"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { issue, team, workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { CreateIssueSchema } from "@/schemas/issue";
import type { MutationResult } from "../types";

export const createIssue = async ({
  title,
  description,
  status,
  priority,
  slug,
  teamId,
  project,
  assignee,
  teamNameId,
}: z.infer<typeof CreateIssueSchema>): Promise<MutationResult> => {
  try {
    CreateIssueSchema.parse({
      title,
      description,
      status,
      priority,
      slug,
      teamId,
      assignee,
      project,
    });

    const user = await getSession();
    if (!user) {
      return { error: "Unauthorized!" };
    }

    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.slug, slug!),
    });

    if (!workspace) {
      return { error: "Workspace not found!" };
    }

    const teamRes = await db.query.team.findFirst({
      where: eq(team.id, teamId ?? ""),
    });

    if (!teamRes) {
      return { error: "Team not found!" };
    }

    const TeamIssueCounter = teamRes.issueCounter;
    console.log(TeamIssueCounter);

    const issueCounter = TeamIssueCounter + 1;

    const issueId: string = teamNameId + "-" + issueCounter;

    await db.insert(issue).values({
      title,
      description,
      status,
      priority,
      reporterId: user.id,
      issueId: issueId,
      workspaceId: workspace?.id,
      teamId: teamId,
      assigneeId: assignee,
      projectId: project,
    });

    await db
      .update(team)
      .set({
        issueCounter,
      })
      .where(eq(team.id, teamId ?? ""));

    return { success: issueId };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError ? "Invalid fields" : "Error creating issue",
    };
  }
};
