import { useEffect, useState } from 'react'

import type { TUser } from '@buildit/utils/types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@buildit/ui/dialog'
import { Sidebar, SidebarContent, SidebarProvider } from '@buildit/ui/sidebar'

import WorkspaceGeneral from '@/components/settings/general'
import SettingsHeader from '@/components/settings/header'
import Members from '@/components/settings/members'
import MyAccountNav from '@/components/settings/my-account'
import Preferences from '@/components/settings/preferences'
import Profile from '@/components/settings/profile'
import Security from '@/components/settings/security'
import UpgradePlan from '@/components/settings/upgrade-plan'
import WorkspaceNav from '@/components/settings/workspace-nav'
import {
  getSettingsMyAccount,
  getSettingsWorkspace,
} from '@/configs/navigations/settings-sidebar-navigations'

interface SettingsProps {
  user: Pick<TUser, 'name' | 'email' | 'image'>
  defaultItem: 'My profile' | 'General'
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * The settings dialog component. This component is used to display the settings dialog.
 * @param props The props object.
 * @param props.user The user object.
 * @param props.defaultItem The default item to be selected.
 * @param props.open The open state.
 * @param props.onOpenChange The onOpenChange function.
 * @returns The settings dialog component.
 */
export default function Settings({
  user,
  defaultItem,
  open,
  onOpenChange,
}: SettingsProps): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<string>(defaultItem)
  const myAccountNav = getSettingsMyAccount()
  const workspaceNav = getSettingsWorkspace()

  useEffect(() => {
    setSelectedItem(defaultItem)
  }, [defaultItem])

  const getContent = () => {
    switch (selectedItem) {
      case 'My profile':
        return <Profile />
      case 'Preferences':
        return <Preferences />
      case 'Account security':
        return <Security />
      case 'General':
        return <WorkspaceGeneral />
      case 'Members':
        return <Members />
      case 'Upgrade plan':
        return <UpgradePlan />
      default:
        return <div>Select menu item</div>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='overflow-hidden p-0 md:max-h-[700px] md:max-w-[800px] lg:max-w-[1200px] sm:rounded-xl'
        isClose={false}
      >
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
            <SettingsHeader title={selectedItem} />
            <div className='mt-4'>{getContent()}</div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
