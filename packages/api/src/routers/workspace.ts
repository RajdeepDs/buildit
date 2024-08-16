import { db, eq } from '@buildit/db'
import { workspaceTable } from '@buildit/db/schema'

import { createRouter, protectedProcedure } from '../trpc'

export const workspaceRouter = createRouter({
  get_workspace: protectedProcedure.query(async ({ ctx }) => {
    const workspace = await db.query.workspaceTable.findFirst({
      where: eq(workspaceTable.userId, ctx.user.id),
    })
    return workspace
  }),
})
