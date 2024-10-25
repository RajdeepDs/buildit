import { useState } from 'react'

import type { TUser } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Button } from '@buildit/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@buildit/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from '@buildit/ui/sidebar'

import MyAccountNav from '@/components/settings/my-account'
import WorkspaceNav from '@/components/settings/workspace-nav'
import { Icons } from '@/components/ui/icons'
import {
  getSettingsMyAccount,
  getSettingsWorkspace,
} from '@/configs/settings-sidebar-navigations'

interface SettingsProps {
  user: Pick<TUser, 'name' | 'email' | 'image'>
}

/**
 * The settings dialog component. This component is used to display the settings dialog.
 * @param props The props object.
 * @param props.user The user object.
 * @returns The settings dialog component.
 */
export default function Settings({ user }: SettingsProps): JSX.Element {
  const [selectedItem, setSelectedItem] = useState('Profile')
  const myAccountNav = getSettingsMyAccount()
  const workspaceNav = getSettingsWorkspace()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'secondary'}
          size={'sm'}
          className='w-fit h-7 text-sub'
        >
          <Icons.settings className='size-4 mr-2 text-sub' />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-hidden p-0 md:max-h-[700px] md:max-w-[800px] lg:max-w-[1200px] sm:rounded-xl'>
        <DialogTitle className='sr-only'>Settings</DialogTitle>
        <DialogDescription className='sr-only'>
          Settings dialog to manage user settings.
        </DialogDescription>
        <SidebarProvider className='items-start'>
          <Sidebar collapsible='none' className='hidden md:flex bg-weak'>
            <SidebarHeader>
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
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <MyAccountNav
                nav={myAccountNav}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
              <WorkspaceNav
                nav={workspaceNav}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
