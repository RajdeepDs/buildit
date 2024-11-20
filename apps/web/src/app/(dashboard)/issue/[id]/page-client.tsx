'use client'

import { Sidebar } from '@buildit/ui/sidebar'

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
  const { data: issue } = api.issues.get_issue_by_id.useQuery(
    { id: issueId },
    { enabled: !!issueId },
  )

  console.log(issue)

  return (
    <div className='h-full flex w-full gap-2'>
      <div className='h-full flex flex-col flex-grow'>
        <Header />
        <main className='bg-weak h-full w-full'>
          {/* Issue Content - Title and Description */}
        </main>
      </div>
      <Sidebar
        collapsible='none'
        className='sticky hidden lg:flex top-0 h-full border bg-weak rounded-md'
      >
        {/* Sidebar content - Properties of the issue */}
      </Sidebar>
    </div>
  )
}
