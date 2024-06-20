"use server";

import { z } from "zod";

import { db } from "@buildit/db";
import { workspaces } from "@buildit/db/src/schema";

import { getSession } from "@/lib/data/get-session";
import { CreateWorkspaceSchema } from "@/schemas/workspace";
import type { MutationResult } from "../types";

export const createWorkspace = async ({
  name,
  slug,
}: z.infer<typeof CreateWorkspaceSchema>): Promise<MutationResult> => {
  try {
    CreateWorkspaceSchema.parse({ name, slug });

    const isSession = await getSession();
    if (!isSession) {
      return { error: "Unauthorized!" };
    }

    await db.insert(workspaces).values({
      name,
      slug,
      userId: isSession.id,
    });
    return { success: "Workspace created successfully" };
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError
          ? "Invalid fields"
          : "Error creating workspace",
    };
  }
};
