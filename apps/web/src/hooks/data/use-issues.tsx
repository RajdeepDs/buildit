import { api } from '@/lib/trpc/react'

/**
 * The hook to get all issues.
 * @returns The issues.
 */
export function useIssues() {
  return api.issues.get_issues.useQuery()
}
