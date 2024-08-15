import type { Config } from 'drizzle-kit'

import { env } from '@buildit/env/web/db'

export default {
  dialect: 'sqlite',
  schema: './src/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  driver: 'turso',
} satisfies Config
