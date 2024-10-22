'use client'

import type { TIssue } from '@buildit/utils/types'

import { useFilterStore } from '@/hooks/store'
// import { useMyIssues } from '@/hooks/store'

import { useMyIssues } from '@/hooks/store/use-my-issues'

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
  const { filters } = useMyIssues()
  const { groupBy } = useFilterStore()

  const filterIssues = (issues: typeof allIssues) => {
    if (filters.length === 0) {
      return issues
    }

    return issues?.filter((issue) => {
      return filters.every((filter) => {
        switch (filter.filter) {
          case 'status':
            return issue.status === filter.value
          case 'priority':
            return issue.priority === filter.value
          case 'teams':
            return issue.teamId === filter.value
          case 'assignee':
            return issue.assigneeId === filter.value
          default:
            return true
        }
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
