import { useMemo } from 'react'

import type { TIssue, TProject } from '@buildit/utils/types'

type TeamCount = Record<string, number>

/**
 * Extracts the unique teams and their counts from the given issues.
 * @param data The list of issues or projects.
 * @returns The unique teams and their counts.
 */
export function useTeamsSummary(data: TIssue[] | TProject[] | undefined) {
  return useMemo(() => {
    if (!data) return { teams: [], teamCount: {} }

    return data.reduce(
      (acc: { teams: string[]; teamCount: TeamCount }, issue) => {
        const { teamId } = issue

        if (teamId === null) return acc

        // Add team to unique  teams list if not already present
        if (!acc.teams.includes(teamId)) {
          acc.teams.push(teamId)
        }
        // Increment the count for the team
        acc.teamCount[teamId] = (acc.teamCount[teamId] ?? 0) + 1
        return acc
      },
      {
        teams: [],
        teamCount: {},
      },
    )
  }, [data])
}
