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
  teamNameId: z.string().optional(),
  assignee: z.string().optional(),
  project: z.string().optional(),
});

export const UpdateIssueSchema = CreateIssueSchema.extend({
  issueId: z.string(),
}).omit({
  slug: true,
  teamId: true,
  teamNameId: true,
  assignee: true,
  project: true,
  status: true,
  priority: true,
});

export const DeleteIssueSchema = z.object({
  issueId: z.string(),
});

export const updateIssuePropertiseSchema = z.object({
  issueId: z.string(),
  status: z.enum(["backlog", "todo", "in progress", "done", "canceled"], {
    message: "Invalid status",
  }),
  priority: z.enum(["urgent", "high", "medium", "low", "no priority"], {
    message: "Invalid priority",
  }),
  assigneeId: z.string().optional(),
  projectId: z.string().optional(),
});
