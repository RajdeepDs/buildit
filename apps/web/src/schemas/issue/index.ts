import { z } from "zod";

export const CreateIssueSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  slug: z.string().min(1),
});
