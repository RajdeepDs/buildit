'use server'

import type { ActionResponse } from '../lib/types'

import { createDate, TimeSpan } from 'oslo'
import { alphabet, generateRandomString } from 'oslo/crypto'

import { db, eq } from '@buildit/db'
import { emailVerificationCodesTable } from '@buildit/db/schema'

import { EmailTemplate, sendEmail } from '../lib/email'

/**
 * Generates an email verification code for the user.
 * @param userId The user ID.
 * @param email The email to verify.
 * @param name The name of the user.
 * @returns The action response.
 */
export async function generateEmailVerificationCode(
  userId: string,
  email: string,
  name: string,
): Promise<ActionResponse> {
  if (!userId || !email) {
    return {
      error: 'Missing required parameters',
    }
  }

  await db
    .delete(emailVerificationCodesTable)
    .where(eq(emailVerificationCodesTable.userId, userId))

  const code = generateRandomString(8, alphabet('0-9'))

  await db.insert(emailVerificationCodesTable).values({
    userId,
    email,
    code,
    expires: createDate(new TimeSpan(10, 'm')),
  })

  await sendEmail(email, EmailTemplate.EmailVerification, {
    code,
    name,
  })

  return { success: 'Email verification code generated successfully' }
}
