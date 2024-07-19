"use server";

import { db, eq } from "@buildit/db";
import { team } from "@buildit/db/src/schema";

import { getUser } from "../user/get-user";

export const getTeams = async () => {
  try {
    const user = await getUser();

    if (!user) {
      return null;
    }

    const teams = await db.query.team.findMany({
      where: eq(team.admin, user.id),
      with: {
        user: true,
        issue: true,
        workspace: true,
      },
    });

    return teams;
  } catch {
    return null;
  }
};
