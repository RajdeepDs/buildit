import { useState } from 'react'

import type { TUser } from '@buildit/utils/types'

import { Button } from '@buildit/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@buildit/ui/dialog'
import { Separator } from '@buildit/ui/separator'
import { Sidebar, SidebarContent, SidebarProvider } from '@buildit/ui/sidebar'

import MyAccountNav from '@/components/settings/my-account'
import Profile from '@/components/settings/profile'
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
  const [selectedItem, setSelectedItem] = useState('My profile')
  const myAccountNav = getSettingsMyAccount()
  const workspaceNav = getSettingsWorkspace()

  const getContent = () => {
    switch (selectedItem) {
      case 'My profile':
        return <Profile />
      case 'Preferences':
        return <div>Preferences</div>
      case 'Security':
        return <div>Security</div>
      case 'General':
        return <div>General</div>
      case 'Members':
        return <div>Members</div>
      case 'Upgrade plan':
        return <div>Upgrade plan</div>
      default:
        return <div>Select menu item</div>
    }
  }

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
            <SidebarContent>
              <MyAccountNav
                user={user}
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
          <main className='flex flex-col flex-1 overflow-hidden p-9'>
            <header className='mb-2'>
              <h1 className='text-lg font-semibold text-sub'>{selectedItem}</h1>
            </header>
            <Separator />
            <div className='mt-4'>{getContent()}</div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
