import 'server-only'

import { cache } from 'react'
import { headers } from 'next/headers'

import { createCaller, createTRPCContext } from '@buildit/api'

const createContext = cache(async () => {
  const heads = new Headers(headers())
  heads.set('x-trpc-source', 'rsc')

  return createTRPCContext({
    headers: heads,
  })
})

export const api = createCaller(createContext)
