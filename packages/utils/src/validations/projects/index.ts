import { z } from 'zod'

const STATUS = [
  'backlog',
  'planned',
  'in progress',
  'completed',
  'canceled',
] as const
const PRIORITY = ['no priority', 'urgent', 'high', 'medium', 'low'] as const

export const CreateProjectSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  description: z.nullable(z.string()),
  status: z.enum(STATUS),
  priority: z.enum(PRIORITY),
  leadId: z.optional(z.nullable(z.string())),
})

export type CreateProjectPayload = z.infer<typeof CreateProjectSchema>

export const CreateProjectInputSchema = CreateProjectSchema.extend({
  teamId: z.string(),
})

export const UpdateProjectPropertiesSchema = z.object({
  id: z.string(),
  status: z.optional(z.enum(STATUS)),
  priority: z.optional(z.enum(PRIORITY)),
  leadId: z.optional(z.nullable(z.string())),
})

export const DeleteProjectSchema = z.object({
  projectId: z.string(),
})
