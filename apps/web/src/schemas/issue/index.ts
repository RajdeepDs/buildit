import { z } from "zod";

export const CreateIssueSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.any(),
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"], {
    message: "Invalid status",
  }),
  priority: z.enum(["urgent", "high", "medium", "low", "no priority"], {
    message: "Invalid priority",
  }),
  slug: z.string().optional(),
  teamId: z.string().optional(),
});

export const UpdateIssueSchema = CreateIssueSchema.extend({
  issueId: z.string(),
}).omit({ slug: true });

export const DeleteIssueSchema = z.object({
  issueId: z.string(),
});
