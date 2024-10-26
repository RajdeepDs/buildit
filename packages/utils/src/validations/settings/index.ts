import { z } from 'zod'

export const ProfileFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
})

export type ProfileFormInput = z.infer<typeof ProfileFormSchema>

export const OnlyPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type OnlyPasswordInput = z.infer<typeof OnlyPasswordSchema>

export const ChangeEmailSchema = z.object({
  email: z.string().email('Invalid email format'),
})

export type ChangeEmailInput = z.infer<typeof ChangeEmailSchema>

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
})

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>

export const ChangeWorkspaceNameSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
})

export type ChangeWorkspaceNameInput = z.infer<typeof ChangeWorkspaceNameSchema>

export const InviteMemberSchema = z.object({
  email: z.string().email('Invalid email format'),
})

export type InviteMemberInput = z.infer<typeof InviteMemberSchema>
