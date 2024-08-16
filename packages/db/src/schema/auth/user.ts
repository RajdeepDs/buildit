import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

import { teamTable } from '../team'
import { workspaceTable } from '../workspace'
import { oauthAccountTable } from './oauth'

export const userTable = sqliteTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text('name'),
  username: text('username').unique(),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  hashedPassword: text('hashedPassword'),
  image: text('image'),
  bio: text('bio'),
  onboarding: integer('onboarding', { mode: 'boolean' }).default(false),
})

export const usersRelations = relations(userTable, ({ many }) => ({
  accounts: many(oauthAccountTable),
  workspaces: many(workspaceTable),
  teams: many(teamTable),
}))
