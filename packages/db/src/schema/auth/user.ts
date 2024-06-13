import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { workspaces } from "../workspace/workspace";
import { accounts } from "./accounts";
import { twoFactorConfirmations } from "./twofactorConfirmation";

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
  password: text("password"),
  bio: text("bio"),
  onboarding: integer("onboarding", { mode: "boolean" }).default(false),
  role: text("role", { enum: ["user", "admin"] }).default("user"),
  isTwoFactorEnabled: integer("isTwoFactorEnabled", {
    mode: "boolean",
  }).default(false),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  twoFactorConfirmation: one(twoFactorConfirmations),
  workspaces: many(workspaces),
}));
