import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const passwordResetTokens = sqliteTable(
  "passwordResetToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (prt) => ({
    compoundKey: primaryKey({ columns: [prt.identifier, prt.token] }),
  }),
);
