import { cookies } from 'next/headers'

import { generateState, GitHub, OAuth2RequestError } from 'arctic'
import { generateId } from 'lucia'

import { db, eq } from '@buildit/db'
import { oauthAccountTable, userTable } from '@buildit/db/schema'
import { env } from '@buildit/env/web/server'

import { lucia } from '../lucia'

const github =
  env.AUTH_GITHUB_ID !== undefined && env.AUTH_GITHUB_SECRET !== undefined
    ? new GitHub(env.AUTH_GITHUB_ID, env.AUTH_GITHUB_SECRET)
    : undefined

/**
 * This function creates a GitHub authorization URL.
 * @returns The response.
 */
export async function createGithubAuthorizationURL(): Promise<Response> {
  if (!github) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const state = generateState()
  const url = await github.createAuthorizationURL(state)

  cookies().set('github_oauth_state', state, {
    path: '/',
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return Response.redirect(url)
}

interface GitHubUser {
  id: string
  email: string
  avatar_url: string
  name: string
}

/**
 * This function validates the GitHub callback.
 * @param request The request.
 * @returns The response.
 */
export async function validateGithubCallback(
  request: Request,
): Promise<Response> {
  if (!github) {
    return new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('github_oauth_state')?.value ?? null
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(code)
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    })
    const githubUser = (await githubUserResponse.json()) as GitHubUser

    if (!githubUser.email) {
      return new Response(
        'Email not found. Please set public email in GitHub.',
        {
          status: 400,
        },
      )
    }

    // Login
    // check if the user exists on the oauth account table
    const existingUser = await db.query.oauthAccountTable.findFirst({
      where: (table, { and, eq }) =>
        and(
          eq(table.providerId, 'github'),
          eq(table.providerUserId, githubUser.id),
        ),
    })
    if (existingUser) {
      const session = await lucia.createSession(existingUser.userId, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      })
    } else {
      // Sign up
      // check if email exists or not
      const existingEmail = await db.query.userTable.findFirst({
        where: eq(userTable.email, githubUser.email),
      })

      if (existingEmail) {
        // email exists, link the account
        // Account linking - GitHub account to an existing account
        await db.transaction(async (tx) => {
          await tx
            .update(userTable)
            .set({
              image: githubUser.avatar_url,
              name: githubUser.name,
            })
            .where(eq(userTable.id, existingEmail.id))

          await tx.insert(oauthAccountTable).values({
            providerId: 'github',
            providerUserId: githubUser.id,
            userId: existingEmail.id,
          })
        })
        const session = await lucia.createSession(existingEmail.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        )
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/',
          },
        })
      } else {
        // email does not exist, create a new account
        const userId = generateId(15)
        await db.insert(userTable).values({
          id: userId,
          email: githubUser.email,
          image: githubUser.avatar_url,
          name: githubUser.name,
        })
        await db.insert(oauthAccountTable).values({
          providerId: 'github',
          providerUserId: githubUser.id,
          userId,
        })
        const session = await lucia.createSession(userId, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        )
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/getting-started',
          },
        })
      }
    }
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}
