'use server'

import { cookies } from 'next/headers'

import type { ActionResponse } from '../lib/types'

import { generateId, Scrypt } from 'lucia'
import { z } from 'zod'

import { db, eq } from '@buildit/db'
import { userTable, waitlistTable } from '@buildit/db/schema'
import { SignUpSchema } from '@buildit/utils/validations'

import { lucia } from '../lucia'

/**
 * The signup action, which will create a new user account.
 * @param _ The unused context object.
 * @param values The values to signup with.
 * @returns The action response.
 */
export async function signup(
  _: unknown,
  values: z.infer<typeof SignUpSchema>,
): Promise<ActionResponse> {
  try {
    SignUpSchema.safeParse({ values })

    const { email, password } = values

    const waitlistUser = await db.query.waitlistTable.findFirst({
      where: eq(waitlistTable.email, email),
    })

    if (!waitlistUser) {
      return {
        error: 'Please join the waitlist.',
      }
    }

    if (waitlistUser.status !== 'allowed') {
      return {
        error:
          'You are not allowed to create an account. Please wait for an invitation.',
      }
    }

    const existingUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    })

    if (existingUser) {
      return {
        error: 'Cannot create an account with that email',
      }
    }

    const userId = generateId(15)

    const hashedPassword = await new Scrypt().hash(password)

    await db.insert(userTable).values({
      id: userId,
      email,
      hashedPassword,
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
    return { success: userId }
  } catch (error) {
    return {
      error:
        error instanceof z.ZodError
          ? 'Invalid fields'
          : 'An unknown error occurred',
    }
  }
}
