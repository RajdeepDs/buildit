import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { users } from "../auth/user";

export const workspaces = sqliteTable("workspace", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  issueCounter: integer("issueCounter").default(0),
});

export const workspaceRelations = relations(workspaces, ({ one }) => ({
  user: one(users, { fields: [workspaces.userId], references: [users.id] }),
}));
