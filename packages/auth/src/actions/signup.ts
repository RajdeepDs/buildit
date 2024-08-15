'use server'

import { cookies } from 'next/headers'

import type { ActionResponse } from '../lib/types'

import { generateId, Scrypt } from 'lucia'
import { createDate, TimeSpan } from 'oslo'
import { alphabet, generateRandomString } from 'oslo/crypto'
import { z } from 'zod'

import { db, eq } from '@buildit/db'
import { emailVerificationCodesTable, userTable } from '@buildit/db/schema'
import { SignUpSchema } from '@buildit/utils/validations'

import { EmailTemplate, sendEmail } from '../lib/email'
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

    const verificationCode = await generateEmailVerificationCode(userId, email)
    await sendEmail(email, EmailTemplate.EmailVerification, {
      code: verificationCode,
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
    return { success: 'Account created successfully' }
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

/**
 * Generate an email verification code for the user.
 * @param userId The user ID.
 * @param email The user's email.
 * @returns The generated code.
 */
async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(emailVerificationCodesTable)
    .where(eq(emailVerificationCodesTable.userId, userId))
  const code = generateRandomString(8, alphabet('0-9'))

  await db.insert(emailVerificationCodesTable).values({
    userId,
    email,
    code,
    expires: createDate(new TimeSpan(10, 'm')), // 10 minutes
  })
  return code
}
