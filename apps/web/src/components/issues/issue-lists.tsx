'use client'

import { api } from '@/lib/trpc/react'

import IssueItem from './issue-item'

/**
 * The Issue list component to display a list of issues. And empty state for Issues Page
 * @returns JSX Element.
 */
export default function IssueList(): JSX.Element {
  const { data: allIssues, error } = api.issues.get_issues.useQuery()

  if (error) {
    console.log(error)
  }

  return (
    <>
      {allIssues?.length === 0 ? (
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
        <div>
          {allIssues?.map((issue, index) => (
            <IssueItem
              key={issue.id}
              issue={issue}
              isFirst={index === 0}
              isLast={index === allIssues.length - 1}
            />
          ))}
        </div>
      )}
    </>
  )
}
