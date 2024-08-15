import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

import { userTable } from './user'

export const emailVerificationCodesTable = sqliteTable(
  'email_verification_codes',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text('user_id')
      .notNull()
      .references(() => userTable.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }),

    email: text('email').notNull(),
    code: text('code').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }),
  },
)
