'use client'

import IssueList from '@/components/issues/issue-lists'
import FloatingToolbar from '@/components/ui/floating-toolbar'
import useMyIssuesStore from '@/lib/store/my-issues-store'

/**
 * The My Issues client page.
 * @returns Next.js RSC page.
 */
export default function MyIssuesClientPage(): JSX.Element {
  const store = useMyIssuesStore() // TODO: Implement store and use it
  return (
    <>
      <div className='relative w-full h-full p-2'>
        <IssueList store={store} />
        <div className='absolute bottom-2 w-full flex justify-center'>
          <FloatingToolbar />
        </div>
      </div>
    </>
  )
}
