import Link from 'next/link'

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'

import { api } from '@/lib/trpc/react'

import { Icons } from '../ui/icons'
import WorkspaceSwitcher from './workspace-switcher'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

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
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
