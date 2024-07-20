"use server";

import { getSession } from "@/lib/data/get-session";
import { CreateProjectSchema } from "@/schemas/project";
import { db } from "@buildit/db";
import { project } from "@buildit/db/src/schema";
import { z } from "zod";
import { MutationResult } from "../types";

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
      return { error: "Team not found!" };
    }

    await db.insert(project).values({
      name: projectName,
      teamId: teamId,
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
