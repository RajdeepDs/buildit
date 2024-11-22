import { z } from 'zod'

const STATUS = ['backlog', 'todo', 'in progress', 'done', 'canceled'] as const
const PRIORITY = ['no priority', 'urgent', 'high', 'medium', 'low'] as const

export const CreateIssueSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.nullable(z.string()),
  status: z.enum(STATUS),
  priority: z.enum(PRIORITY),
  assigneeId: z.optional(z.nullable(z.string())),
  projectId: z.optional(z.nullable(z.string())),
})

export type CreateIssuePayload = z.infer<typeof CreateIssueSchema>

export const CreateIssueInputSchema = CreateIssueSchema.extend({
  teamId: z.string(),
})

export const UpdateIssuePropertiesSchema = z.object({
  id: z.string(),
  status: z.optional(z.enum(STATUS)),
  priority: z.optional(z.enum(PRIORITY)),
  assigneeId: z.optional(z.nullable(z.string())),
  projectId: z.optional(z.nullable(z.string())),
})

export const UpdateIssueContentSchema = z.object({
  id: z.string(),
  title: z.optional(z.string().min(1, { message: 'Title is required.' })),
  description: z.optional(z.nullable(z.string())),
})

export type UpdateIssueContentPayload = z.infer<typeof UpdateIssueContentSchema>
