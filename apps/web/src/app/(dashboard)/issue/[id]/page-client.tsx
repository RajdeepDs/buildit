'use client'

import { Skeleton } from '@buildit/ui/skeleton'
import { toast } from '@buildit/ui/toast'

import Content from '@/components/issue/content'
import IssueProperties from '@/components/issue/issue-properties'
import Header from '@/components/layout/header'
import { api } from '@/lib/trpc/react'

/**
 * The IssuePage component is the page that displays the details of a specific issue.
 * @param props The props for the IssuePage component.
 * @param props.issueId The ID of the issue.
 * @returns JSX.Element
 */
export default function IssueClientPage({
  issueId,
}: {
  issueId: string
}): JSX.Element {
  // Fetch the issue details using the ID
  const {
    data: issue,
    isLoading,
    error,
  } = api.issues.get_issue_by_id.useQuery(
    { id: issueId },
    { enabled: !!issueId },
  )

  if (error) {
    toast({
      title: 'Error',
      description: `Failed to fetch issue - ${issueId}`,
      variant: 'destructive',
    })
  }

  return (
    <div className='h-full w-full flex'>
      <div className='h-full flex flex-col flex-grow gap-2 p-2'>
        <Header />
        <main className='h-full w-full flex justify-center overflow-scroll'>
          {/* Issue Content - Title and Description */}
          {isLoading ? (
            <Skeleton className='bg-weak h-full w-2/3 rounded-md' />
          ) : (
            <Content
              id={issue?.id}
              title={issue?.title}
              description={issue?.description}
            />
          )}
        </main>
      </div>
      <IssueProperties isLoading={isLoading} properties={issue} />
    </div>
  )
}