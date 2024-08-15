import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

import { userTable } from '../auth/user'
import { issueTable } from '../issue'
import { workspaceTable } from '../workspace'

export const teamTable = sqliteTable('team', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text('name').notNull(),
  teamId: text('teamId').notNull().unique(),
  issueCounter: integer('issueCounter').default(0).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  admin: text('admin')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  workspaceId: text('workspaceId').references(() => workspaceTable.id, {
    onDelete: 'cascade',
  }),
})

export const teamRelations = relations(teamTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [teamTable.admin],
    references: [userTable.id],
  }),
  workspace: one(workspaceTable, {
    fields: [teamTable.workspaceId],
    references: [workspaceTable.id],
  }),
  issue: many(issueTable),
}))
