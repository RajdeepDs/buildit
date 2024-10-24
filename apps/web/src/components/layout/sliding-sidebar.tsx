import type { ReactNode } from 'react'

import { cn } from '@buildit/ui/cn'

/**
 * The sliding sidebar component, which will be used in the dashboard of the application.
 * @param props
 * @param props.children
 * @param props.sidebarContent
 * @param props.issuesCount
 * @param props.headerTitle
 * @param props.sidebarOpen
 * @param props.onToggleSidebar
 * @returns The sliding sidebar component.
 */
export default function SlidingSidebar({
  sidebarOpen,
  children,
}: {
  sidebarOpen: boolean
  children: ReactNode
  sidebarContent: ReactNode
  headerTitle: string
  issuesCount: number | undefined
}): JSX.Element {
  return (
    <div className='relative flex h-full w-full overflow-hidden'>
      <div
        className={cn(
          'flex-1 transition-all ease-in-out duration-300',
          sidebarOpen ? 'pr-72 mr-2' : 'pr-0',
        )}
      >
        {children}
      </div>
      {/* Sliding sidebar */}
      <div
        className={cn(
          'absolute top-0 right-0 h-full bg-white border rounded-md transition-all ease-in-out duration-300',
          sidebarOpen ? 'w-72 opacity-100' : 'w-0 opacity-0',
        )}
      ></div>
    </div>
  )
}
