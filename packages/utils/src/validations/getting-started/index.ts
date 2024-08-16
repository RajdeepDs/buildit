import { z } from 'zod'

export const WorkspaceSetupFormSchema = z.object({
  workspaceName: z
    .string()
    .min(3, 'Workspace name must be at least 3 characters'),
  workspaceSlug: z
    .string()
    .min(3, 'Workspace URL must be at least 3 characters'),
})

export const CreateTeamFormSchema = z.object({
  teamName: z.string().min(3, 'Team name must be at least 3 characters.'),
  teamIdentifier: z
    .string()
    .max(5, 'Team identifier must be at most 5 characters.'),
})

export const UserProfileFormSchema = z.object({
  fullname: z.string().min(3, 'Full name must be at least 3 characters'),
  username: z.string().min(3, 'User name must be at least 3 characters'),
  bio: z.string().optional(),
})
