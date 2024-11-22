import { useMemo } from 'react'

import type { TIssue } from '@buildit/utils/types'

/**
 * Extracts the unique assignees and their counts from the given issues.
 * @param data The list of issues.
 * @returns An object containing the unique assignees and their counts.
 */
export function useAssigneeSummary(data: TIssue[] | undefined) {
  return useMemo(() => {
    if (!data) {
      return {
        uniqueAssignees: [],
        assigneeCount: {},
      }
    }

    const result = data.reduce(
      (acc, { assigneeId }) => {
        const assigneeKey = assigneeId ?? 'Unassigned'

        if (!acc.uniqueAssignees.has(assigneeKey)) {
          acc.uniqueAssignees.add(assigneeKey)
        }

        acc.assigneeCount[assigneeKey] =
          (acc.assigneeCount[assigneeKey] || 0) + 1

        return acc
      },
      {
        uniqueAssignees: new Set<string>(),
        assigneeCount: {} as Record<string, number>,
      },
    )

    return {
      uniqueAssignees: Array.from(result.uniqueAssignees),
      assigneeCount: result.assigneeCount,
    }
  }, [data])
}
