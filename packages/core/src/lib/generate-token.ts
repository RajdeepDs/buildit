import crypto from 'crypto'

/**
 * Generate a random token - which will be used in the magic link
 * @param length the length of the token
 * @returns a random token
 */
export async function generateRandomToken(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err !== null) {
        reject(err)
      } else {
        resolve(buf)
      }
    })
  })

  return buf.toString('hex').slice(0, length)
}
