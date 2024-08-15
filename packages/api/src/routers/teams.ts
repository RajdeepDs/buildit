import { TRPCError } from '@trpc/server'

import { db, eq } from '@buildit/db'
import { teamTable, workspaceTable } from '@buildit/db/schema'
import {
  CreateTeamFormSchema,
  DeleteTeamSchema,
} from '@buildit/utils/validations'

import { createRouter, protectedProcedure } from '../trpc'

const getWorkspace = async (userId: string) => {
  return db.query.workspaceTable.findFirst({
    where: eq(workspaceTable.userId, userId),
  })
}

export const teamRouter = createRouter({
  get_teams: protectedProcedure.query(async ({ ctx }) => {
    const teams = await db.query.teamTable.findMany({
      where: eq(teamTable.admin, ctx.user.id),
      with: {
        workspace: true,
        user: true,
      },
    })
    return teams
  }),
  create_team: protectedProcedure
    .input(CreateTeamFormSchema)
    .mutation(async ({ ctx, input }) => {
      const workspace = await getWorkspace(ctx.user.id)

      if (!workspace) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
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
  delete_team: protectedProcedure
    .input(DeleteTeamSchema)
    .mutation(async ({ input }) => {
      await db.delete(teamTable).where(eq(teamTable.id, input.teamId))
      return { message: 'Team deleted successfully' }
    }),
})
