import { db, eq } from '@buildit/db'
import { userTable } from '@buildit/db/schema'
import { ProfileFormSchema } from '@buildit/utils/validations'

import { createRouter, protectedProcedure } from '../trpc'

export const settingsRouter = createRouter({
  update_profile: protectedProcedure
    .input(ProfileFormSchema)
    .mutation(async ({ input, ctx }) => {
      await db
        .update(userTable)
        .set({
          name: input.name,
          username: input.username,
        })
        .where(eq(userTable.id, ctx.user.id))

      return {
        message: 'Your profile information has been updated.',
      }
    }),
})
