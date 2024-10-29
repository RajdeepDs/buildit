import { useMemo } from 'react'

import type { TIssue } from '@buildit/utils/types'

type PriorityCount = Record<string, number>

/**
 * Extracts the unique priorities and their counts from the given issues.
 * @param allIssues The list of issues.
 * @returns The unique priorities and their counts.
 */
export function usePrioritySummary(allIssues: TIssue[] | undefined) {
  return useMemo(() => {
    if (!allIssues) return { priorities: [], priorityCount: {} }

    return allIssues.reduce(
      (acc: { priorities: string[]; priorityCount: PriorityCount }, issue) => {
        const { priority } = issue
        if (priority === null) return acc
        // Add priority to unique priorities list if not already present
        if (!acc.priorities.includes(priority)) {
          acc.priorities.push(priority)
        }
        // Increment the count for the priority
        acc.priorityCount[priority] = (acc.priorityCount[priority] || 0) + 1
        return acc
      },
      { priorities: [], priorityCount: {} },
    )
  }, [allIssues])
}
