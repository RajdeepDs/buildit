import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { userTable } from './user'

export const sessionTable = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull(),
})
