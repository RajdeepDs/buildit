import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

import { userTable } from '../auth/user'
import { teamTable } from '../team'

export const workspaceTable = sqliteTable('workspace', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  userId: text('userId').references(() => userTable.id, {
    onDelete: 'cascade',
  }),
})

export const workspaceRelations = relations(
  workspaceTable,
  ({ one, many }) => ({
    user: one(userTable, {
      fields: [workspaceTable.userId],
      references: [userTable.id],
    }),
    teams: many(teamTable),
  }),
)
