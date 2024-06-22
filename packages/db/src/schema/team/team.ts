import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { users } from "../auth/user";
import { workspaces } from "../workspace";

export const team = sqliteTable("team", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  teamId: text("teamId").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  admin: text("admin")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspaceId").references(() => workspaces.id, {
    onDelete: "cascade",
  }),
});

export const teamRelations = relations(team, ({ one }) => ({
  user: one(users, { fields: [team.admin], references: [users.id] }),
  workspace: one(workspaces, {
    fields: [team.workspaceId],
    references: [workspaces.id],
  }),
}));
