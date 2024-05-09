import { z } from "zod";

export const CreateIssueSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string(),
  status: z.enum(["open", "in-progress", "closed"]),
  priority: z.enum(["high", "medium", "low"]),
  slug: z.string(),
});
