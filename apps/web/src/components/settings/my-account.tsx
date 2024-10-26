import type { TUser } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'

import { Icons } from '@/components/ui/icons'

/**
 * The my account navigation component.
 * @param props The props object.
 * @param props.nav The navigation object.
 * @param props.selectedItem The selected item.
 * @param props.setSelectedItem The set selected item.
 * @param props.user The user object.
 * @returns The my account navigation component.
 */
export default function MyAccountNav({
  nav,
  selectedItem,
  setSelectedItem,
  user,
}: {
  nav: {
    title: string
    icon: string
  }[]
  selectedItem: string
  setSelectedItem: (value: string) => void
  user: Pick<TUser, 'name' | 'email' | 'image'>
}): JSX.Element {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>My account</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className='w-full flex items-center gap-2 px-2'>
            {user.image && (
              <Avatar className='size-7 rounded-full'>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
            )}
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold'>{user.name}</span>
              <span className='text-xs text-sub'>{user.email}</span>
            </div>
          </div>
        </SidebarMenuItem>
        {nav.map((item, index) => {
          const Icon = Icons[item.icon as keyof typeof Icons]
          return (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                isActive={item.title === selectedItem}
                onClick={() => {
                  setSelectedItem(item.title)
                }}
              >
                <Icon className='size-5 mr-2 text-sub' />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
