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
 * @returns The my account navigation component.
 */
export default function MyAccountNav({
  nav,
  selectedItem,
  setSelectedItem,
}: {
  nav: {
    title: string
    icon: string
  }[]
  selectedItem: string
  setSelectedItem: (value: string) => void
}): JSX.Element {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>My account</SidebarGroupLabel>
      <SidebarMenu>
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
