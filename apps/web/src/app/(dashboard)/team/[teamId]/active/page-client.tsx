'use client'

import { cn } from '@buildit/ui/cn'

import Header from '@/components/layout/header'
import DisplayMenu from '@/components/ui/display-menu'
import FilterMenu from '@/components/ui/filter-menu'
import FloatingToolbar from '@/components/ui/floating-toolbar'
import { useFilterStore, useFloatingToolbar } from '@/hooks/store'

/**
 * The Active issues client page.
 * @returns Next.js RSC page.
 */
export default function ActiveIssuesClientPage(): JSX.Element {
  const { isOpen } = useFloatingToolbar()
  const { and } = useFilterStore()
  return (
    <>
      <div className='relative w-full h-full p-2 flex flex-col space-y-2'>
        <Header />
        <div className='flex justify-between items-center'>
          <FilterMenu />
          <DisplayMenu />
        </div>

        {/* <IssueList /> */}

        <div
          className={cn(
            'absolute bottom-5 w-full justify-center transition-all duration-300 overflow-hidden',
            isOpen || and.length > 0
              ? 'flex opacity-100 translate-y-0 h-auto'
              : 'flex opacity-0 translate-y-full h-0 pointer-events-none',
          )}
        >
          <FloatingToolbar filters={and} />
        </div>
      </div>
    </>
  )
}
