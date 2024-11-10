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
  description: text('description', { mode: 'json' }),
  status: text('status', {
    enum: ['backlog', 'planned', 'in progress', 'completed', 'canceled'],
  }),
  priority: text('priority', {
    enum: ['low', 'medium', 'high', 'urgent', 'no priority'],
  }),
  admin: text('admin')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
    }),
  leadId: text('leadId').references(() => userTable.id, {
    onDelete: 'cascade',
  }),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  teamId: text('teamId')
    .notNull()
    .references(() => teamTable.id, { onDelete: 'cascade' }),
})

export const projectRelations = relations(projectTable, ({ one }) => ({
  user: one(userTable, {
    fields: [projectTable.admin],
    references: [userTable.id],
  }),
  lead: one(userTable, {
    fields: [projectTable.leadId],
    references: [userTable.id],
  }),
  team: one(teamTable, {
    fields: [projectTable.teamId],
    references: [teamTable.id],
  }),
}))
