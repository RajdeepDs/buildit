'use client'

import IssueList from '@/components/issues/issue-lists'
import useMyIssuesStore from '@/lib/store/my-issues-store'

/**
 * The My Issues client page.
 * @returns Next.js RSC page.
 */
export default function MyIssuesClientPage(): JSX.Element {
  const store = useMyIssuesStore() // TODO: Implement store and use it
  return (
    <>
      <div className='w-full p-2'>
        <IssueList />
      </div>
    </>
  )
}
