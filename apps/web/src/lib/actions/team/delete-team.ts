"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { team } from "@buildit/db/src/schema";

import { DeleteTeamSchema } from "@/schemas/team";

export const deleteTeam = async ({
  teamId,
}: z.infer<typeof DeleteTeamSchema>) => {
  const validateFields = DeleteTeamSchema.parse({
    teamId,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  try {
    await db.delete(team).where(eq(team.id, teamId));
    return { success: "Team deleted!" };
  } catch {
    return { error: "Error deleting team" };
  }
};
