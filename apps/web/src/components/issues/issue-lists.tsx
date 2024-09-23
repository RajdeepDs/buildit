'use client'

import { api } from '@/lib/trpc/react'

import IssueItem from './issue-items'

/**
 * Issue List component to display all the issues
 * @returns JSX.Element
 */
export default function IssueList(): JSX.Element {
  const { data: allIssues, error } = api.issues.get_issues.useQuery()

  if (error) {
    console.log(error)
  }

  return (
    <>
      {allIssues?.map((issue, index) => (
        <IssueItem
          key={issue.id}
          issue={issue}
          isFirst={index === 0}
          isLast={index === allIssues.length - 1}
        />
      ))}
    </>
  )
}
