import { TRPCError } from '@trpc/server'

import { db, eq } from '@buildit/db'
import { issueTable, workspaceTable } from '@buildit/db/schema'

import { createRouter, protectedProcedure } from '../trpc'

const getWorkspace = async (userId: string) => {
  return db.query.workspaceTable.findFirst({
    where: eq(workspaceTable.userId, userId),
  })
}

export const issuesRouter = createRouter({
  get_issues: protectedProcedure.query(async ({ ctx }) => {
    const workspace = await getWorkspace(ctx.user.id)

    if (!workspace) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Workspace not found',
        cause: 'The user does not have a workspace',
      })
    }

    const issues = await db.query.issueTable.findMany({
      where: eq(issueTable.workspaceId, workspace.id),
    })

    return issues
  }),
})
