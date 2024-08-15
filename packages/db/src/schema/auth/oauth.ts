import { relations } from 'drizzle-orm'
import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { userTable } from './user'

export const oauthAccountTable = sqliteTable(
  'oauth_account',
  {
    providerId: text('provider_id').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => userTable.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.providerId, table.providerUserId] }),
  }),
)

export const accountsRelations = relations(oauthAccountTable, ({ one }) => ({
  user: one(userTable, {
    fields: [oauthAccountTable.userId],
    references: [userTable.id],
  }),
}))
