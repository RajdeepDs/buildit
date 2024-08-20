import { redirect } from 'next/navigation'

import type { ReactNode } from 'react'

import { auth } from '@buildit/auth'

import Sidebar from '@/components/sidebar/sidebar'

/**
 * The dashboard layout of the entire application. This is where we wrap the entire application with the sidebar.
 * @param props The props to the layout, which will be every page in this application.
 * @param props.children The children, which is the page the user is currently on.
 * @returns The layout of the application.
 */
export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}): Promise<JSX.Element> {
  const { user } = await auth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='flex h-dvh'>
      {/* Sidebar component */}
      <Sidebar />
      <main className='flex w-full flex-grow flex-col overflow-hidden bg-white'>
        {children}
      </main>
    </div>
  )
}