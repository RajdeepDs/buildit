import { TRPCError } from '@trpc/server'

import { db, eq } from '@buildit/db'
import { teamTable, userTable, workspaceTable } from '@buildit/db/schema'
import {
  CreateTeamFormSchema,
  UserProfileFormSchema,
  WorkspaceSetupFormSchema,
} from '@buildit/utils/validations'

import { createRouter, protectedProcedure } from '../trpc'

const getWorkspace = async (userId: string) => {
  return db.query.workspaceTable.findFirst({
    where: eq(workspaceTable.userId, userId),
  })
}

export const onboardingRouter = createRouter({
  workspace_setup: protectedProcedure
    .input(WorkspaceSetupFormSchema)
    .mutation(async ({ ctx, input }) => {
      await db.insert(workspaceTable).values({
        name: input.workspaceName,
        userId: ctx.user.id,
      })
      return {
        message: 'Workspace created successfully',
      }
    }),
  create_team: protectedProcedure
    .input(CreateTeamFormSchema)
    .mutation(async ({ ctx, input }) => {
      const workspace = await getWorkspace(ctx.user.id)

      if (!workspace) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Workspace not found',
          cause: 'The user does not have a workspace',
        })
      }

      await db.insert(teamTable).values({
        name: input.teamName,
        teamId: input.teamIdentifier,
        admin: ctx.user.id,
        workspaceId: workspace.id,
      })
      return {
        message: 'Team created successfully',
      }
    }),
  update_user_profile: protectedProcedure
    .input(UserProfileFormSchema)
    .mutation(async ({ input }) => {
      await db.update(userTable).set({
        name: input.fullname,
        username: input.username,
        bio: input.bio ?? '',
      })
      return {
        message: 'Profile updated successfully',
      }
    }),
  update_onboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await db
      .update(userTable)
      .set({
        onboarding: true,
      })
      .where(eq(userTable.id, ctx.user.id))

    return {
      message: 'Onboarding completed successfully',
    }
  }),
})
