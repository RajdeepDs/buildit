import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { team } from "../team/team";

export const member = sqliteTable("member", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  teamId: text("teamId").references(() => team.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["admin", "member"] }),
});

export const memberRelations = relations(member, ({ one }) => ({
  team: one(team, { fields: [member.teamId], references: [team.id] }),
}));
