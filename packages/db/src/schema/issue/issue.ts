import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { users } from "../auth";
import { project } from "../project/project";
import { team } from "../team";
import { workspaces } from "../workspace";

export const issue = sqliteTable("issue", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description", { mode: "json" }),
  status: text("status", {
    enum: ["backlog", "todo", "in progress", "done", "canceled"],
  }),
  priority: text("priority", {
    enum: ["low", "medium", "high", "urgent", "no priority"],
  }),
  reporterId: text("reporterId").references(() => users.id, {
    onDelete: "cascade",
  }),
  assigneeId: text("assigneeId").references(() => users.id, {
    onDelete: "cascade",
  }),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  workspaceId: text("workspaceId").references(() => workspaces.id, {
    onDelete: "cascade",
  }),
  issueId: text("issueId").notNull().unique(),
  teamId: text("teamId").references(() => team.id, { onDelete: "cascade" }),
  projectId: text("projectId").references(() => project.id, {
    onDelete: "cascade",
  }),
});

export const issueRelations = relations(issue, ({ one }) => ({
  reporter: one(users, { fields: [issue.reporterId], references: [users.id] }),
  assignee: one(users, { fields: [issue.assigneeId], references: [users.id] }),
  workspace: one(workspaces, {
    fields: [issue.workspaceId],
    references: [workspaces.id],
  }),
  team: one(team, { fields: [issue.teamId], references: [team.id] }),
  project: one(project, {
    fields: [issue.projectId],
    references: [project.id],
  }),
}));
