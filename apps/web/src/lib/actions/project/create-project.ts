"use server";

import { CreateProjectSchema } from "@/schemas/project";
import { z } from "zod";
import { MutationResult } from "../types";
import { getSession } from "@/lib/data/get-session";
import { getTeamByTeamId } from "@/lib/data/team/get-team-by-teamId";
import { db } from "@buildit/db";
import { project } from "@buildit/db/src/schema";

export const createProject = async ({
  projectName,
  teamId,
}: z.infer<typeof CreateProjectSchema>): Promise<MutationResult> => {
  try {
    CreateProjectSchema.parse({ projectName, teamId });

    const user = await getSession();
    if (!user) {
      return { error: "Unauthorized!" };
    }

    if (!teamId) {
      return { error: "Team ID is required!" };
    }

    const team = await getTeamByTeamId({ teamId });
    if (!team) {
      return { error: "Team not found" };
    }

    await db.insert(project).values({
      name: projectName,
      teamId: team.id,
      admin: user.id,
    });

    return { success: "Project created successfully" };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError
          ? "Invalid fields"
          : "Error creating project",
    };
  }
};
