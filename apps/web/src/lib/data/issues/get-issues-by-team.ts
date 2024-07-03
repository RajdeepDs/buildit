"use server";

import { db, eq } from "@buildit/db";
import { team as teamSchema } from "@buildit/db/src/schema";

export const getIssuesByTeam = async ({ teamId }: { teamId: string }) => {
  try {
    const team = await db.query.team.findFirst({
      where: eq(teamSchema.teamId, teamId),
      with: {
        issue: {
          with: {
            reporter: true,
          },
        },
      },
    });
    return team?.issue ?? [];
  } catch {
    return null;
  }
};
