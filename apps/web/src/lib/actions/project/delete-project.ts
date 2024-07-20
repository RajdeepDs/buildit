"use server";

import { z } from "zod";

import { db, eq } from "@buildit/db";
import { project } from "@buildit/db/src/schema";

import { DeleteProjectSchema } from "@/schemas/project";

export const deleteProject = async ({
  projectId,
}: z.infer<typeof DeleteProjectSchema>) => {
  const validateFields = DeleteProjectSchema.parse({
    projectId,
  });

  if (!validateFields) {
    return { error: "Invalid fields" };
  }

  try {
    await db.delete(project).where(eq(project.id, projectId));
    return { success: "Project deleted!" };
  } catch {
    return { error: "Error deleting project" };
  }
};
