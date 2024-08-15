import { db, eq } from '@buildit/db'
import { userTable } from '@buildit/db/schema'

import { createRouter, protectedProcedure } from '../trpc'

export const userRouter = createRouter({
  get_user: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, ctx.user.id),
    })
    return user
  }),
})
