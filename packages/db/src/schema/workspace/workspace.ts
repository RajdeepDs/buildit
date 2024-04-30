import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

import { users } from "../auth/user";

export const workspaces = sqliteTable("workspace", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
});

export const workspaceRelations = relations(workspaces, ({ one }) => ({
  user: one(users, { fields: [workspaces.userId], references: [users.id] }),
}));
