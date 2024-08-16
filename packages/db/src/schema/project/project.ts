import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

import { userTable } from '../auth'
import { teamTable } from '../team'

export const projectTable = sqliteTable('project', {
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
  admin: text('admin')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  teamId: text('teamId')
    .notNull()
    .references(() => teamTable.id, { onDelete: 'cascade' }),
})

export const projectRelations = relations(projectTable, ({ one }) => ({
  user: one(userTable, {
    fields: [projectTable.admin],
    references: [userTable.id],
  }),
  team: one(teamTable, {
    fields: [projectTable.teamId],
    references: [teamTable.id],
  }),
}))
