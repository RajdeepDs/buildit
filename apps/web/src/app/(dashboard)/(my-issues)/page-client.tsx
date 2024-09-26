'use client'

import { cn } from '@buildit/ui/cn'

import IssueList from '@/components/issues/issue-lists'
import FilterMenu from '@/components/ui/filter-menu'
import FloatingToolbar from '@/components/ui/floating-toolbar'
import { useFloatingToolbar } from '@/hooks/store'
import useMyIssuesStore from '@/lib/store/my-issues-store'

/**
 * The My Issues client page.
 * @returns Next.js RSC page.
 */
export default function MyIssuesClientPage(): JSX.Element {
  const store = useMyIssuesStore()

  const { isOpen } = useFloatingToolbar()

  return (
    <>
      <div className='relative w-full h-full p-2 flex flex-col space-y-2'>
        {/* Filter & Display options */}
        <div className='flex justify-between items-center'>
          <FilterMenu />
          {/* <DisplayMenu /> */}
        </div>

        <IssueList store={store} />

        <div
          className={cn(
            'absolute bottom-5 w-full justify-center transition-all duration-300 overflow-hidden',
            isOpen
              ? 'flex opacity-100 translate-y-0 h-auto'
              : 'flex opacity-0 translate-y-full h-0 pointer-events-none',
          )}
        >
          <FloatingToolbar />
        </div>
      </div>
    </>
  )
}
