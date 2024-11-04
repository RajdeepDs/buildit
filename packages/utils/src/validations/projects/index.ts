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
  description: z.string(),
  status: z.enum(STATUS),
  priority: z.enum(PRIORITY),
  leadId: z.optional(z.nullable(z.string())),
})

export type CreateProjectPayload = z.infer<typeof CreateProjectSchema>

export const DeleteProjectSchema = z.object({
  projectId: z.string(),
})
