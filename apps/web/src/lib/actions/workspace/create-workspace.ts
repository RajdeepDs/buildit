"use server";

import type { z } from "zod";

import { db } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { CreateWorkspaceSchema } from "@/schemas/workspace";

export const createWorkspace = async ({
  name,
  slug,
}: z.infer<typeof CreateWorkspaceSchema>) => {
  const validateFields = CreateWorkspaceSchema.parse({
    name,
    slug,
  });

  if (!validateFields) {
    return { error: "Invalid fields!" };
  }

  const isSession = await getSession();

  if (!isSession) {
    return { error: "Unauthorized!" };
  }

  try {
    await db.insert(workspaces).values({
      name,
      slug,
      userId: isSession.id,
    });
    return { success: "Workspace created." };
  } catch {
    return { error: "Error creating workspace." };
  }
};
