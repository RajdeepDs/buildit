import { TRPCError } from '@trpc/server'
import { Scrypt } from 'lucia'
import { z } from 'zod'

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
  update_password: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string().optional(),
        newPassword: z.string().min(8),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (input.currentPassword) {
        const existingUser = await db.query.userTable.findFirst({
          where: eq(userTable.id, ctx.user.id),
          columns: {
            hashedPassword: true,
          },
        })

        if (!existingUser?.hashedPassword) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        const isValidPassword = await new Scrypt().verify(
          existingUser.hashedPassword,
          input.currentPassword,
        )

        if (!isValidPassword) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'The current password is incorrect.',
          })
        }
      }

      if (!input.newPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'New password is required.',
        })
      }
      const hashedPassword = await new Scrypt().hash(input.newPassword)
      await db
        .update(userTable)
        .set({
          hashedPassword: hashedPassword,
        })
        .where(eq(userTable.id, ctx.user.id))

      return {
        message: 'Your password has been updated.',
      }
    }),
})
