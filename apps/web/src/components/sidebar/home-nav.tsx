import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'

import { Icons } from '@/components/ui/icons'
import { getHomeNavigations } from '@/configs/sidebar-navigations'

/**
 * The home navigation component. This is where we will have the home navigation of the application.
 * @returns The home navigation component.
 */
export default function HomeNav(): JSX.Element {
  const Navigations = getHomeNavigations()
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Home</SidebarGroupLabel>
      <SidebarMenu>
        {Navigations.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons]
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={item.href === pathname}>
                <Link href={item.href}>
                  <Icon className='size-4 text-sub' />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
