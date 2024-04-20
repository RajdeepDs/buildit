import { relations } from "drizzle-orm";
import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";

import { users } from "./user";

export const twoFactorConfirmations = sqliteTable(
  "twoFactorConfirmations",
  {
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (t) => ({
    compoundKey: primaryKey({ columns: [t.userId] }),
  }),
);

export const twoFactorConfirmationsRelations = relations(
  twoFactorConfirmations,
  ({ one }) => ({
    user: one(users, {
      fields: [twoFactorConfirmations.userId],
      references: [users.id],
    }),
  }),
);
