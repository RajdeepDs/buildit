import { api } from '@/lib/trpc/react'

/**
 * The hook to get all teams.
 * @returns The teams.
 */
export function useTeams() {
  return api.team.get_teams.useQuery()
}
