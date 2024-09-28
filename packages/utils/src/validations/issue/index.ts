import { z } from 'zod'

export const CreateIssueSchema = z.object({
  title: z.string(),
  description: z.any().nullable(),
})
