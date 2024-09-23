'use client'

import type { SidebarStore } from '@/lib/store/sidebar-store'

import { cn } from '@buildit/ui/cn'

import Header from '@/components/layout/header'
import Sidebar from '@/components/sidebar/sidebar'
import useSidebarStore from '@/lib/store/sidebar-store'

/**
 * The dashboard layout of the entire application.
 * @param props The props to the layout, which will be every page in this application.
 * @param props.children The children, which is the page the user is currently on.
 * @returns The layout of the application.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const store = useSidebarStore() as SidebarStore

  const hidden = store.hidden
  const hover = store.hover

  return (
    <div className='flex flex-col w-full'>
      <Header
        open={hidden}
        onOpenChange={store.setHidden}
        hover={hover}
        onHoverChange={store.setHover}
      />
      <div className='w-full h-full flex'>
        {hidden ? (
          <div
            className={cn(
              'absolute bg-white h-[90%] inset-y-0 left-0 my-auto w-fit z-50 rounded-e-md border-e border-y shadow-2xl',
              'transition-transform duration-200 transform',
              hover ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <Sidebar />
          </div>
        ) : (
          <aside className='bg-weak'>
            <Sidebar />
          </aside>
        )}
        <div className={cn('w-full pr-3', hidden && 'px-3')}>{children}</div>
      </div>
    </div>
  )
}
