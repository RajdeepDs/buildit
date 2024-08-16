'use server'

import { cookies } from 'next/headers'

import type { ActionResponse } from '../lib/types'

import { isWithinExpirationDate } from 'oslo'
import { z } from 'zod'

import { db, eq } from '@buildit/db'
import { emailVerificationCodesTable, userTable } from '@buildit/db/schema'
import { VerifyEmailSchema } from '@buildit/utils/validations'

import { auth } from '../auth'
import { lucia } from '../lucia'

/**
 * The verifyEmail action, which will verify a new user email.
 * @param _ The unused context object.
 * @param values The values to verify the email with.
 * @returns The action response.
 */
export async function verifyEmail(
  _: unknown,
  values: z.infer<typeof VerifyEmailSchema>,
): Promise<ActionResponse> {
  try {
    VerifyEmailSchema.safeParse({ values })

    const { code } = values

    const { user } = await auth()
    if (!user) {
      return { error: 'User not authenticated' }
    }

    const dbCode = await db.transaction(async (tx) => {
      const item = await tx.query.emailVerificationCodesTable.findFirst({
        where: (table, { eq }) => eq(table.userId, user.id),
      })
      if (item) {
        await tx
          .delete(emailVerificationCodesTable)
          .where(eq(emailVerificationCodesTable.id, item.id))
      }
      return item
    })

    if (!dbCode || dbCode.code !== code)
      return { error: 'Invalid verification code' }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!isWithinExpirationDate(dbCode.expires!))
      return { error: 'Verification code expired' }

    if (dbCode.email !== user.email) return { error: 'Email does not match' }

    await lucia.invalidateUserSessions(user.id)
    await db
      .update(userTable)
      .set({ emailVerified: new Date() })
      .where(eq(userTable.id, user.id))
    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
    return { success: 'Email verified' }
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError
          ? 'Invalid fields'
          : 'An unknown error occurred',
    }
  }
}
