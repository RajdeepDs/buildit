'use server'

import { cookies } from 'next/headers'

import type { ActionResponse } from '../lib/types'

import { Scrypt } from 'lucia'
import { z } from 'zod'

import { db } from '@buildit/db'
import { SignInSchema } from '@buildit/utils/validations'

import { lucia } from '../lucia'

/**
 * The login action, which will login the user.
 * @param _ The unused context object.
 * @param values The values to login with.
 * @returns The action response.
 */
export async function login(
  _: unknown,
  values: z.infer<typeof SignInSchema>,
): Promise<ActionResponse> {
  try {
    SignInSchema.safeParse({ values })

    const { email, password } = values

    const existingUser = await db.query.userTable.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    })

    if (!existingUser?.hashedPassword) {
      return {
        error: 'Incorrect email or password',
      }
    }

    const validPassword = await new Scrypt().verify(
      existingUser.hashedPassword,
      password,
    )
    if (!validPassword) {
      return {
        error: 'Incorrect email or password',
      }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
    return { success: 'Logged in successfully' }
  } catch (error) {
    console.log('Error:', error)

    return {
      error:
        error instanceof z.ZodError
          ? 'Invalid fields'
          : 'An unknown error occurred',
    }
  }
}
