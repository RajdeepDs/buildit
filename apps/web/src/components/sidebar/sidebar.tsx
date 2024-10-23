import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  const [{ data: user }, { data: workspace }, { data: teams }] = api.useQueries(
    (query) => [
      query.user.get_user(),
      query.workspace.get_workspace(),
      query.team.get_teams(),
    ],
  )

  if (!user || !workspace || !teams) {
    return <></>
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <WorkspaceSwitcher user={user} workspace={workspace} />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={'/'}>
                <Icons.search className='h-4 w-4 text-soft' />
                <span>Search</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <HomeNav />
        <TeamsNav teams={teams} />
      </SidebarContent>
    </Sidebar>
  )
}
