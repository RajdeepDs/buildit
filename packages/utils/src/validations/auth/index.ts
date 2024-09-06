import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignInInput = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignUpInput = z.infer<typeof SignUpSchema>

export const VerifyEmailSchema = z.object({
  code: z.string().length(8, 'Verification code must be 8 characters'),
})

export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>

export const JoinWaitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
})

export type JoinWaitlistInput = z.infer<typeof JoinWaitlistSchema>
