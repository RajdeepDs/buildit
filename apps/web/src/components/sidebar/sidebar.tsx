'use client'

import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from '@buildit/ui/sidebar'

import HomeNav from '@/components/sidebar/home-nav'
import TeamsNav from '@/components/sidebar/teams-nav'
import WorkspaceSwitcher from '@/components/sidebar/workspace-switcher'
import { Icons } from '@/components/ui/icons'
import { api } from '@/lib/trpc/react'

/**
 * The sidebar component. This is where we will have the sidebar of the application.
 * @returns The sidebar component.
 */
export function AppSidebar() {
  const [
    { data: user, isLoading: isUserLoading },
    { data: workspace, isLoading: isWorkspaceLoading },
    { data: teams, isLoading: isTeamsLoading },
  ] = api.useQueries((query) => [
    query.user.get_user(),
    query.workspace.get_workspace(),
    query.team.get_teams(),
  ])

  return (
    <Sidebar>
      <SidebarHeader>
        {isUserLoading || isWorkspaceLoading ? (
          <SidebarMenuSkeleton />
        ) : (
          <>
            {user && workspace && (
              <WorkspaceSwitcher user={user} workspace={workspace} />
            )}
          </>
        )}
        <SidebarMenu>
          {isWorkspaceLoading ? (
            <SidebarMenuItem>
              <SidebarMenuSkeleton />
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href={'/'}>
                  <Icons.search className='h-4 w-4 text-soft' />
                  <span>Search</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isWorkspaceLoading ? (
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <HomeNav />
        )}
        {isTeamsLoading ? (
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <>{teams && <TeamsNav teams={teams} />}</>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
