import type { ReactNode } from 'react'

import { Badge } from '@buildit/ui/badge'
import { cn } from '@buildit/ui/cn'
import { Sidebar, SidebarContent, SidebarHeader } from '@buildit/ui/sidebar'

interface SlidingSidebarProps {
  sidebarOpen: boolean
  issuesCount: number | undefined
  children: ReactNode
}

/**
 * The sliding sidebar component, which will be used in the dashboard of the application.
 * @param props The component props.
 * @param props.sidebarOpen The sidebar open state.
 * @param props.issuesCount The count of issues.
 * @param props.children The children of the component.
 * @returns The sliding sidebar component.
 */
export default function SlidingSidebar({
  sidebarOpen,
  issuesCount,
  children,
}: SlidingSidebarProps): JSX.Element {
  return (
    <div
      className={cn(
        'absolute top-0 right-0 h-full bg-white border rounded-md transition-all ease-in-out duration-300',
        sidebarOpen ? 'w-80 opacity-100' : 'w-0 opacity-0',
      )}
    >
      <Sidebar collapsible='none' className='w-full'>
        <SidebarHeader className='border-b'>
          <div className='flex items-center justify-between'>
            <h1 className='font-medium text-sm'>My issues</h1>
            <Badge>{issuesCount}</Badge>
          </div>
        </SidebarHeader>
        <SidebarContent
          className={cn(
            'p-3 transition-opacity duration-300 ease-in-out overflow-hidden',
            sidebarOpen ? 'opacity-100' : 'opacity-0',
          )}
        >
          {children}
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
