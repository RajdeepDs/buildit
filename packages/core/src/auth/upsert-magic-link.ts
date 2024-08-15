import { generateRandomToken } from 'src/lib/generate-token'

export const TOKEN_LENGTH = 32
export const TOKEN_TTL = 1000 * 60 * 5 // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7 // 7 days

/**
 *
 * @param email
 */
export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH)
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL)
}
