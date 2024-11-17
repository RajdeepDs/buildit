import { useMemo } from 'react'

import type { TIssue, TProject } from '@buildit/utils/types'

type StatusCount = Record<string, number>

/**
 * Extracts the unique statuses and their counts from the given issues.
 * @param data The list of issues or projects.
 * @returns The unique statuses and their counts.
 */
export function useStatusSummary(data: TIssue[] | TProject[] | undefined) {
  return useMemo(() => {
    if (!data) return { statuses: [], statusCount: {} }

    return data.reduce(
      (acc: { statuses: string[]; statusCount: StatusCount }, issue) => {
        const { status } = issue
        if (status === null) return acc
        // Add status to unique statuses list if not already present
        if (!acc.statuses.includes(status)) {
          acc.statuses.push(status)
        }
        // Increment the count for the status
        acc.statusCount[status] = (acc.statusCount[status] ?? 0) + 1
        return acc
      },
      { statuses: [], statusCount: {} },
    )
  }, [data])
}
