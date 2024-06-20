"use server";

import { z } from "zod";

import { db } from "@buildit/db";
import { member, team } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { getWorkspaceWithUser } from "@/lib/data/workspace/get-workspace-with-user";
import { CreateTeamFormSchema } from "@/schemas/getting-started";
import type { CreateTeamResponse, MutationResult } from "../types";

const getWorkspace = async () => {
  const result = await getWorkspaceWithUser();
  return result?.workspaces[0];
};

export const createTeam = async ({
  teamName,
  teamIdentifier,
}: z.infer<typeof CreateTeamFormSchema>): Promise<MutationResult> => {
  try {
    CreateTeamFormSchema.parse({ teamName, teamIdentifier });

    const user = await getSession();
    if (!user) {
      return { error: "Unauthorized!" };
    }

    const workspace = await getWorkspace();
    if (!workspace) {
      return { error: "Workspace not found" };
    }

    const teamRes: CreateTeamResponse = await db
      .insert(team)
      .values({
        name: teamName,
        teamId: teamIdentifier,
        workspaceId: workspace.id,
        userId: user.id,
      })
      .returning();

    if (!teamRes || !teamRes[0]) {
      return { error: "Error creating team" };
    }

    await db.insert(member).values({
      name: user.name as string,
      email: user.email as string,
      teamId: teamRes[0]?.id,
      role: "admin",
    });

    return { success: "Team created successfully" };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError ? "Invalid fields" : "Error creating team",
    };
  }
};
