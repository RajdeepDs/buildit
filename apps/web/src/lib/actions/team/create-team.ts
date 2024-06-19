"use server";

import { z } from "zod";

import { db } from "@buildit/db";
import { member, team } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { getWorkspaceByUserId } from "@/lib/data/workspace/get-workspace-by-userId";

const createTeamSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters."),
  teamIdentifier: z
    .string()
    .max(5, "Team identifier must be at most 5 characters."),
});

type CreateTeamResponse = {
  id: string;
  name: string;
  teamId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  workspaceId: string | null;
  userId: string | null;
}[];

export const createTeam = async ({
  teamName,
  teamIdentifier,
}: z.infer<typeof createTeamSchema>) => {
  const validateFields = createTeamSchema.parse({
    teamName,
    teamIdentifier,
  });

  if (!validateFields) {
    return { error: "Invalid fields!" };
  }

  const user = await getSession();
  if (!user) {
    return { error: "User not found." };
  }

  const workspace = await getWorkspaceByUserId();

  if (!workspace) {
    return { error: "Workspace not found." };
  }

  try {
    const teamRes: CreateTeamResponse = await db
      .insert(team)
      .values({
        name: teamName,
        teamId: teamIdentifier,
        workspaceId: workspace.workspaces[0]?.id,
        userId: user.id,
      })
      .returning();

    if (!teamRes) {
      return { error: "Error creating team." };
    }

    await db.insert(member).values({
      name: user.name as string,
      email: user.email as string,
      teamId: teamRes[0]?.id,
      role: "admin",
    });

    return { success: "Team created." };
  } catch {
    return { error: "Error creating team." };
  }
};
