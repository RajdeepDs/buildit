"use server";

import { z } from "zod";
import { updateTeamSchema } from "@/schemas/settings";
import { MutationResult } from "../types";
import { db, eq } from "@buildit/db";
import { team } from "@buildit/db/src/schema";

export const updateTeam = async ({
  id,
  teamName,
  teamIdentifier,
}: z.infer<typeof updateTeamSchema>): Promise<MutationResult> => {
  try {
    updateTeamSchema.parse({ id, teamName, teamIdentifier });

    await db
      .update(team)
      .set({ name: teamName, teamId: teamIdentifier })
      .where(eq(team.id, id));
    return { success: "Team updated successfully." };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError ? "Invalid fields" : "Error updating team",
    };
  }
};
