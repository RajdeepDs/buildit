import { z } from 'zod'

export const DeleteTeamSchema = z.object({
  teamId: z.string(),
})
