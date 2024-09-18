'use client'

import { useEffect, useState } from 'react'

import type { Store } from '@/lib/store/my-issues-store'
import type { TIssue } from '@buildit/utils/types'

import { api } from '@/lib/trpc/react'

import IssueItem from './issue-item'

/**
 * The Issue list component to display a list of issues. And empty state for Issues Page
 * @param props The component properties.
 * @param props.store The store to use.
 * @returns React component.
 */
export default function IssueList({ store }: { store: Store }): JSX.Element {
  const { data: allIssues, error } = api.issues.get_issues.useQuery()

  const [filteredIssues, setFilteredIssues] = useState<TIssue[]>([])

  const filteredStatus = store.filterByStatus
  const filteredPriority = store.filterByPriority
  const groupBy = store.groupBy

  useEffect(() => {
    const filtered = allIssues?.filter((issue) => {
      if (filteredStatus && filteredStatus !== '') {
        return issue.status === filteredStatus
      }
      if (filteredPriority && filteredPriority !== '') {
        return issue.priority === filteredPriority
      }
      return true
    })

    if (store.search) {
      setFilteredIssues(
        filtered?.filter((issue) =>
          issue.title.toLowerCase().includes(store.search.toLowerCase()),
        ) ?? [],
      )
    } else {
      setFilteredIssues(filtered ?? allIssues ?? [])
    }
  }, [allIssues, filteredStatus, store.search, filteredPriority])

  // TODO: Infer the types of the groupBy parameter
  const groupIssues = (issues: any, groupBy: any) => {
    if (groupBy === 'noGrouping') {
      return { Uncategorized: issues }
    }

    return issues.reduce((groups: any, issue: any) => {
      const groupKey = issue[groupBy] || 'Uncategorized'
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(issue)
      return groups
    }, {})
  }

  const groupedIssues = groupIssues(filteredIssues, groupBy)

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(allIssues)
  return (
    <div className='h-full'>
      {allIssues?.length == 0 ? (
        <div className='flex h-1/2 w-full flex-col items-center justify-center space-y-4 rounded-lg'>
          <div className='flex flex-col items-center'>
            <h1 className='font-cal text-strong text-xl'>No issues found</h1>
            <p className='text-sm text-sub'>
              There aren&apos;t any issues at the moment. Create one to get
              started!{' '}
            </p>
          </div>
        </div>
      ) : (
        // Object.keys(groupedIssues).map((group) => (
        //   <div key={group}>
        //     <IssuesGroup group={group} />
        //     <ul className='list-none'>
        //       {groupedIssues[group].map((issue: any) => (
        //         <li key={issue.id}>
        //           <IssueItem issue={issue} />
        //         </li>
        //       ))}
        //     </ul>
        //   </div>
        // ))
        <ul>
          {filteredIssues.map((issue) => (
            <li key={issue.issueId}>
              <IssueItem issue={issue} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
