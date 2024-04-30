import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});
