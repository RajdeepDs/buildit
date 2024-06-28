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

    const teams = await db.query.team.findFirst({
      where: eq(team.admin, user.id),
    });

    return teams;
  } catch {
    return null;
  }
};
