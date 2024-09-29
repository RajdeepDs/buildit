import { z } from 'zod'

export const CreateIssueSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  priority: z.string(),
})
