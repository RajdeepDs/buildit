import { api } from '@/lib/trpc/react'

/**
 * The hook to get the user.
 * @returns The user.
 */
export function useUser() {
  return api.user.get_user.useQuery()
}
