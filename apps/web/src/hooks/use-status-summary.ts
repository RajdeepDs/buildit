import { useMemo } from 'react'

import type { TIssue } from '@buildit/utils/types'

type StatusCount = Record<string, number>

/**
 * Extracts the unique statuses and their counts from the given issues.
 * @param allIssues The list of issues.
 * @returns The unique statuses and their counts.
 */
export function useStatusSummary(allIssues: TIssue[] | undefined) {
  return useMemo(() => {
    if (!allIssues) return { statuses: [], statusCount: {} }

    return allIssues.reduce(
      (acc: { statuses: string[]; statusCount: StatusCount }, issue) => {
        const { status } = issue
        if (status === null) return acc
        // Add status to unique statuses list if not already present
        if (!acc.statuses.includes(status)) {
          acc.statuses.push(status)
        }
        // Increment the count for the status
        acc.statusCount[status] = (acc.statusCount[status] || 0) + 1
        return acc
      },
      { statuses: [], statusCount: {} },
    )
  }, [allIssues])
}
