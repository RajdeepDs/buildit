"use server";

import { db, eq } from "@buildit/db";
import { getUser } from "../user/get-user";
import { project } from "@buildit/db/src/schema";

export const getProjects = async () => {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }

    const projects = await db.query.project.findMany({
      where: eq(project.admin, user.id),
      with: {
        user: true,
      },
    });

    return projects;
  } catch {
    return null;
  }
};
