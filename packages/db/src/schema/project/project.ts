import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { text } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "../auth";
import { team } from "../team";

export const project = sqliteTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  updatedAt: integer("updatedAt", { mode: "timestamp_ms" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  admin: text("admin")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  teamId: text("teamId")
    .notNull()
    .references(() => team.id, { onDelete: "cascade" }),
});

export const projectRelations = relations(project, ({ one }) => ({
  user: one(users, { fields: [project.admin], references: [users.id] }),
  team: one(team, { fields: [project.teamId], references: [team.id] }),
}));
