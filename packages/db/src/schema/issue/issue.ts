import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

import { userTable } from '../auth'
import { projectTable } from '../project'
import { teamTable } from '../team'
import { workspaceTable } from '../workspace'

export const issueTable = sqliteTable('issue', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text('title').notNull(),
  description: text('description', { mode: 'json' }),
  status: text('status', {
    enum: ['backlog', 'todo', 'in progress', 'done', 'canceled'],
  }),
  priority: text('priority', {
    enum: ['low', 'medium', 'high', 'urgent', 'no priority'],
  }),
  labels: text('labels', { mode: 'json' }).$type<string[]>(),
  reporterId: text('reporterId').references(() => userTable.id, {
    onDelete: 'cascade',
  }),
  assigneeId: text('assigneeId').references(() => userTable.id, {
    onDelete: 'cascade',
  }),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  workspaceId: text('workspaceId').references(() => workspaceTable.id, {
    onDelete: 'cascade',
  }),
  issueId: text('issueId').notNull().unique(),
  teamId: text('teamId').references(() => teamTable.id, {
    onDelete: 'cascade',
  }),
  projectId: text('projectId').references(() => projectTable.id, {
    onDelete: 'cascade',
  }),
})

export const issueRelations = relations(issueTable, ({ one }) => ({
  reporter: one(userTable, {
    fields: [issueTable.reporterId],
    references: [userTable.id],
  }),
  assignee: one(userTable, {
    fields: [issueTable.assigneeId],
    references: [userTable.id],
  }),
  workspace: one(workspaceTable, {
    fields: [issueTable.workspaceId],
    references: [workspaceTable.id],
  }),
  team: one(teamTable, {
    fields: [issueTable.teamId],
    references: [teamTable.id],
  }),
  project: one(projectTable, {
    fields: [issueTable.projectId],
    references: [projectTable.id],
  }),
}))
