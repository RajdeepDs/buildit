import { TRPCError } from '@trpc/server'

import { db, eq } from '@buildit/db'
import { waitlistTable } from '@buildit/db/schema'
import { JoinWaitlistSchema } from '@buildit/utils/validations'

import { createRouter, publicProcedure } from '../trpc'

const getEmail = async (email: string) => {
  const user = await db.query.waitlistTable.findFirst({
    where: eq(waitlistTable.email, email),
  })
  if (user) {
    return true
  }
  return false
}

export const joinRouter = createRouter({
  join_waitlist: publicProcedure
    .input(JoinWaitlistSchema)
    .mutation(async ({ input }) => {
      if (await getEmail(input.email)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email is already in the waitlist',
          cause: 'The user is already in the waitlist',
        })
      }
      await db.insert(waitlistTable).values({
        name: input.name,
        email: input.email,
      })
      return {
        message: 'Joined in the waitlist successfully',
      }
    }),
})
