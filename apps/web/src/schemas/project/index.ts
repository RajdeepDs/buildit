import { z } from "zod";

export const CreateProjectSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  teamId: z.string().optional(),
});
