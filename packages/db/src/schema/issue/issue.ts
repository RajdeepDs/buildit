import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { users } from "../auth";
import { workspaces } from "../workspace";

export const issue = sqliteTable("issue", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", {
    enum: ["backlog", "todo", "in progress", "done", "canceled"],
  }),
  priority: text("priority", {
    enum: ["low", "medium", "high", "urgent", "no priority"],
  }),
  reporterId: text("reporterId").references(() => users.id, {
    onDelete: "cascade",
  }),
  assigneeId: text("assigneeId"),
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
});

export const issueRelations = relations(issue, ({ one }) => ({
  reporter: one(users, { fields: [issue.reporterId], references: [users.id] }),
  workspace: one(workspaces, {
    fields: [issue.workspaceId],
    references: [workspaces.id],
  }),
}));
