'use client'

import { useEffect, useMemo, useState } from 'react'

import type { FilterQuery } from '@/lib/store/filter-store'
import type { TIssue } from '@buildit/utils/types'

import IssuesGroup from '@/components/issues/issue-group'
import IssueItem from '@/components/issues/issue-item'
import EmptyState from '@/components/ui/empty-state'
import { useFilterStore } from '@/hooks/store'

interface FilterDetail {
  key: string
  operator: string
  value: string | null
}

const traverseFilterQuery = (query: FilterQuery): FilterDetail[] => {
  const result: FilterDetail[] = []

  if (!query || typeof query !== 'object') return result

  Object.entries(query).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // This is a FilterCondition object
      Object.entries(value).forEach(([operator, conditionValue]) => {
        result.push({ key, operator, value: conditionValue })
      })
    } else if (typeof value === 'object') {
      result.push(...traverseFilterQuery(value as FilterQuery))
    }
  })

  return result
}

const applyFilterCondition = (issue: TIssue, filter: FilterDetail): boolean => {
  const { key, operator, value } = filter
  switch (key) {
    case 'team':
      return issue.teamId === String(value)
    case 'assignee': {
      if (operator === 'in' && Array.isArray(value)) {
        // Handle the case where value is an array containing null
        return (
          value.includes(issue.assigneeId) ||
          (value.includes(null) && issue.assigneeId === null)
        )
      }
      // Handle single value for equality check
      if (value === null || value === 'null') {
        return issue.assigneeId === null
      }
      return issue.assigneeId === String(value)
    }
    default:
      switch (operator) {
        case 'eq':
          return issue[key] === value
        case 'in':
          return Array.isArray(value) && value.includes(issue[key])
        default:
          return true
      }
  }
}

/**
 * The Issue list component to display a list of issues. And empty state for Issues Page
 * @param props The props for the component.
 * @param props.allIssues The list of all issues.
 * @returns JSX Element.
 */
export default function IssueList({
  allIssues,
}: {
  allIssues: TIssue[] | undefined
}): JSX.Element {
  const { and, groupBy } = useFilterStore()

  const filteredAndGroupedIssues = useMemo(() => {
    if (!allIssues) return { '': [] }

    const filtered =
      and.length === 0
        ? allIssues
        : allIssues.filter((issue) =>
            and.every((filterQuery) =>
              traverseFilterQuery(filterQuery).every((filter) =>
                applyFilterCondition(issue, filter),
              ),
            ),
          )

    if (groupBy === 'No Grouping') return { '': filtered }

    return filtered.reduce<Record<string, TIssue[]>>((groups, issue) => {
      const groupKey =
        (issue[groupBy as keyof TIssue] as string) || 'Uncategorized'

      if (!groups[groupKey]) groups[groupKey] = []
      groups[groupKey].push(issue)
      return groups
    }, {})
  }, [allIssues, and, groupBy])

  const [maxIssueIdWidth, setMaxIssueIdWidth] = useState(0)

  useEffect(() => {
    const issueIds = Object.values(filteredAndGroupedIssues)
      .flat()
      .map((issue) => issue.issueId)
    const maxWidth = Math.max(...issueIds.map((id) => id.toString().length)) * 9 // Approximate width based on character count
    setMaxIssueIdWidth(maxWidth)
  }, [filteredAndGroupedIssues])

  if (Object.values(filteredAndGroupedIssues).flat().length === 0) {
    return <EmptyState id='myIssues' />
  }

  return (
    <>
      {Object.entries(filteredAndGroupedIssues).map(([group, issues]) => (
        <div key={group}>
          <IssuesGroup group={group} count={issues.length} />
          {issues.map((issue, index) => (
            <IssueItem
              key={issue.id}
              issue={issue}
              isFirst={index === 0}
              isLast={index === issues.length - 1}
              maxIssueIdWidth={maxIssueIdWidth}
            />
          ))}
        </div>
      ))}
    </>
  )
}
