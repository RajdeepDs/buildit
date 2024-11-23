'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { TTeam } from '@buildit/utils/types'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@buildit/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@buildit/ui/sidebar'

import { Icons } from '@/components/ui/icons'
import { getTeamsNavigations } from '@/configs/navigations/sidebar-navigations'

interface TeamsNavProps {
  teams: Pick<TTeam, 'id' | 'name' | 'teamId'>[]
}

/**
 * The teams navigation component. This is where we will have the teams navigation of the application.
 * @param props - The props object.
 * @param props.teams - The teams object.
 * @returns The teams navigation component.
 */
export default function TeamsNav({ teams }: TeamsNavProps): JSX.Element {
  const pathname = usePathname()
  return (
    <Collapsible defaultOpen className='group/collapsible'>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Your teams
            <Icons.chevronRight className='size-4 text-sub ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {teams.map((team) => {
                const teamNavigations = getTeamsNavigations(team.teamId)
                return (
                  <Collapsible
                    key={team.id}
                    defaultOpen
                    className='group/collapsible-item'
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <Icons.home className='size-4 text-sub' />
                          {team.name}
                          <Icons.chevronRight className='size-4 text-sub ml-auto transition-transform group-data-[state=open]/collapsible-item:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {teamNavigations.map((item) => {
                            const Icon = Icons[item.icon as keyof typeof Icons]
                            return (
                              <SidebarMenuSubItem key={item.name}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={item.href === pathname}
                                >
                                  <Link href={item.href}>
                                    <Icon className='size-4 text-sub' />
                                    <span>{item.name}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
