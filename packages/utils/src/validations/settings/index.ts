import { z } from 'zod'

export const ProfileFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
})

export type ProfileFormInput = z.infer<typeof ProfileFormSchema>
