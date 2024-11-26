import React from 'react'

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import { SidebarInset, SidebarProvider } from '@buildit/ui/sidebar'

import { AppSidebar } from '@/components/sidebar/sidebar'
import { api } from '@/lib/trpc/server'

/**
 * The dashboard layout of the entire application.
 * @param props The props to the layout, which will be every page in this application.
 * @param props.children The children, which is the page the user is currently on.
 * @returns The layout of the application.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [['user', 'get_user'], { type: 'query' }],
    queryFn: () => api.user.get_user(),
  })
  await queryClient.prefetchQuery({
    queryKey: [['workspace', 'get_workspace'], { type: 'query' }],
    queryFn: () => api.workspace.get_workspace(),
  })
  await queryClient.prefetchQuery({
    queryKey: [['team', 'get_teams'], { type: 'query' }],
    queryFn: () => api.team.get_teams(),
  })
  await queryClient.prefetchQuery({
    queryKey: [['project', 'get_projects'], { type: 'query' }],
    queryFn: () => api.project.get_projects(),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <div className='flex w-full'>
      <SidebarProvider>
        <HydrationBoundary state={dehydratedState}>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </HydrationBoundary>
      </SidebarProvider>
    </div>
  )
}
