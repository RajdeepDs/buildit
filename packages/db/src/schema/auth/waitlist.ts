import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const waitlistTable = sqliteTable('waitlist', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text('name'),
  email: text('email').notNull().unique(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).default(
    sql`(CURRENT_TIMESTAMP)`,
  ),
  status: text('status').default('waiting'),
})
