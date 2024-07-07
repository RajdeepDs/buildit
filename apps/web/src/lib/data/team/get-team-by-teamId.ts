"use server";

import { db, eq } from "@buildit/db";
import { team } from "@buildit/db/src/schema";

export const getTeamByTeamId = async ({ teamId }: { teamId: string }) => {
  try {
    const teams = await db.query.team.findFirst({
      where: eq(team.teamId, teamId),
    });

    return teams;
  } catch {
    return null;
  }
};
