'use client'

import React from 'react'

import { SidebarProvider } from '@buildit/ui/sidebar'

import { AppSidebar } from '../sidebar/sidebar'

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
}): React.JSX.Element {
  return (
    <div className='flex w-full'>
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </div>
  )
}
