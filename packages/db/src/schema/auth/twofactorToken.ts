import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const twoFactorTokens = sqliteTable(
  "twoFactorTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (t) => ({
    compoundKey: primaryKey({ columns: [t.identifier, t.token] }),
  }),
);
