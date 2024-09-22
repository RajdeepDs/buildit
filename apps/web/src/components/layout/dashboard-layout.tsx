'use client'

import { useState } from 'react'

import { cn } from '@buildit/ui/cn'

import Sidebar from '../sidebar/sidebar'
import Header from './header'

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
  const [hidden, setHidden] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <div className='flex flex-col w-full'>
      <Header
        open={hidden}
        onOpenChange={setHidden}
        hover={hover}
        onHoverChange={setHover}
      />
      <div className='flex w-full flex-grow overflow-hidden pr-3'>
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
        {children}
      </div>
    </div>
  )
}
