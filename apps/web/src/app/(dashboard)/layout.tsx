import { redirect } from 'next/navigation'

import type { ReactNode } from 'react'

import { auth } from '@buildit/auth'

import DashboardLayout from '@/components/layout/dashboard-layout'

/**
 * The dashboard layout of the entire application. This is where we wrap the entire application with the sidebar.
 * @param props The props to the layout, which will be every page in this application.
 * @param props.children The children, which is the page the user is currently on.
 * @returns The layout of the application.
 */
export default async function DashboardRootLayout({
  children,
}: {
  children: ReactNode
}): Promise<JSX.Element> {
  const { user } = await auth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='flex bg-weak h-dvh'>
      <DashboardLayout>
        <main className='bg-white p-2 h-full'>{children}</main>
      </DashboardLayout>
    </div>
  )
}
