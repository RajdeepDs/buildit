"use server";

import { db, eq } from "@buildit/db";
import { project } from "@buildit/db/src/schema";
import { getTeamByTeamId } from "../team/get-team-by-teamId";

export const getProjectbyTeam = async ({ teamId }: { teamId: string }) => {
  try {
    const team = await getTeamByTeamId({ teamId });
    if (!team) return null;

    const projects = await db.query.project.findMany({
      where: eq(project.teamId, team?.id),
      with: {
        user: true,
      },
    });

    return projects;
  } catch {
    return null;
  }
};
