'use client'

import type { FilterQuery } from '@/lib/store/filter-store'
import type { TIssue } from '@buildit/utils/types'

import { useFilterStore } from '@/hooks/store'

import IssuesGroup from './issue-group'
import IssueItem from './issue-item'

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

  // Helper function to apply filter conditions
  const applyFilterCondition = (
    issue: TIssue,
    filter: FilterDetail,
  ): boolean => {
    const { key, operator, value } = filter

    // Handle different filter cases
    switch (key) {
      // Handling the teams filter
      case 'teams':
        return issue.teamId === String(value)
      // Handling the assignee filter
      case 'assignee':
        return issue.assigneeId === String(value)
      default:
        switch (operator) {
          case 'eq': // Equal condition
            return issue[key] === value
          case 'in': // "In" condition for arrays
            return Array.isArray(value) && value.includes(issue[key])
          default:
            return true
        }
    }
  }

  const filterIssues = (issues: TIssue[] | undefined) => {
    if (!issues || and.length === 0) return issues

    return issues.filter((issue) => {
      return and.every((filterQuery) => {
        const filters = traverseFilterQuery(filterQuery)
        return filters.every((filter) => {
          const matches = applyFilterCondition(issue, filter)
          return matches
        })
      })
    })
  }

  const filteredIssues = filterIssues(allIssues)

  const groupIssues = (
    issues: TIssue[] | undefined,
    groupBy: keyof TIssue | 'No Grouping',
  ) => {
    if (!issues || groupBy === 'No Grouping') return { '': issues ?? [] }

    return issues.reduce((groups: Record<string, TIssue[]>, issue: TIssue) => {
      const groupKey = (issue[groupBy] as string) || 'Uncategorized'
      if (!groups[groupKey]) groups[groupKey] = []
      groups[groupKey].push(issue)
      return groups
    }, {})
  }

  const groupedIssues = groupIssues(filteredIssues, groupBy)

  return (
    <>
      {filteredIssues?.length === 0 ? (
        <div className='flex h-1/2 w-full flex-col items-center justify-center space-y-4 rounded-lg'>
          <div className='flex flex-col items-center'>
            <h1 className='font-cal text-strong text-xl'>No issues found</h1>
            <p className='text-sm text-sub'>
              There aren&apos;t any issues at the moment. Create one to get
              started!
            </p>
          </div>
        </div>
      ) : (
        <>
          {Object.entries(groupedIssues).map(([group, issues]) => (
            <div key={group}>
              <IssuesGroup group={group} count={issues.length} />
              {issues.map((issue, index) => (
                <IssueItem
                  key={issue.id}
                  issue={issue}
                  isFirst={index === 0}
                  isLast={index === issues.length - 1}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </>
  )
}

interface FilterDetail {
  key: string
  operator: string
  value: any
}

const traverseFilterQuery = (query: FilterQuery): FilterDetail[] => {
  const result: FilterDetail[] = []

  if (!query || typeof query !== 'object') return result

  Object.keys(query).forEach((key) => {
    const value = query[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // This is a FilterCondition object
      Object.keys(value).forEach((operator) => {
        const conditionValue = value[operator]
        result.push({
          key,
          operator,
          value: conditionValue,
        })
      })
    } else if (typeof value === 'object') {
      console.log(`Nested query for key: ${key}`)
      result.push(...traverseFilterQuery(value as FilterQuery))
    }
  })

  return result
}
