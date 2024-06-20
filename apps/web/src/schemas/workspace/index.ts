import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

export const UpdateWorkspaceSchema = z.object({
  workspaceName: z.string().min(1, { message: "Workspace name is required" }),
  workspaceURL: z.string().min(1, { message: "Workspace URL is required" }),
});
