import { useMemo } from 'react'

import type { TIssue, TProject } from '@buildit/utils/types'

type PriorityCount = Record<string, number>

/**
 * Extracts the unique priorities and their counts from the given issues.
 * @param data The list of issues or projects.
 * @returns The unique priorities and their counts.
 */
export function usePrioritySummary(data: TIssue[] | TProject[] | undefined) {
  return useMemo(() => {
    if (!data) return { priorities: [], priorityCount: {} }

    return data.reduce(
      (acc: { priorities: string[]; priorityCount: PriorityCount }, issue) => {
        const { priority } = issue
        if (priority === null) return acc
        // Add priority to unique priorities list if not already present
        if (!acc.priorities.includes(priority)) {
          acc.priorities.push(priority)
        }
        // Increment the count for the priority
        acc.priorityCount[priority] = (acc.priorityCount[priority] ?? 0) + 1
        return acc
      },
      { priorities: [], priorityCount: {} },
    )
  }, [data])
}
