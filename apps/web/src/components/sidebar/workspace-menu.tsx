import { useEffect, useState, useTransition } from 'react'

import type { TUser, TWorkspace } from '@buildit/utils/types'

import { logout } from '@buildit/auth/actions/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'

import Settings from '@/components/settings/settings'
import { Icons } from '@/components/ui/icons'

interface SidebarHeaderNavProps {
  user: Pick<TUser, 'id' | 'name' | 'email' | 'image'>
  workspace: Pick<TWorkspace, 'name'>
}

/**
 * The workspace menu component. This component is used to display the workspace menu.
 * @param props The props object.
 * @param props.user The user object.
 * @param props.workspace The workspace object.
 * @returns The workspace menu component.
 */
export default function WorkspaceMenu({
  user,
  workspace,
}: SidebarHeaderNavProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const [_, startTransition] = useTransition()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsDefaultItem, setSettingsDefaultItem] = useState<
    'My profile' | 'General'
  >('My profile')

  const onLogOut = () => {
    startTransition(async () => {
      await logout()
    })
    setOpen(false)
  }

  const openSettings = (defaultItem: 'My profile' | 'General') => {
    setSettingsDefaultItem(defaultItem)
    setSettingsOpen(true)
    setOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case '1':
            e.preventDefault()
            openSettings('My profile')
            break
          case '2':
            e.preventDefault()
            openSettings('General')
            break
        }
      }
    }

    if (open) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild className='select-none'>
            <SidebarMenuButton className='w-fit px-1.5'>
              {user.image && (
                <Avatar className='size-5 rounded'>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>
                    <Icons.userCircle2 className='size-4 text-sub' />
                  </AvatarFallback>
                </Avatar>
              )}
              <span className='font-medium text-strong'>{workspace.name}</span>
              <Icons.chevronDown className='ml-auto h-4 w-4 text-soft' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='min-w-56 rounded-lg'
            align='start'
            side='right'
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-0.5 text-left text-sm'>
                {user.image && (
                  <Avatar className='size-8 rounded-md'>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>
                      <Icons.userCircle2 className='size-4 text-sub' />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className='flex flex-col items-start'>
                  <span className='font-semibold'>{workspace.name}</span>
                  <span className='font-medium text-xs text-sub'>
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  openSettings('My profile')
                }}
              >
                <Icons.settings className='size-4 text-sub' />
                Settings
                <DropdownMenuShortcut>⌘1</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                  openSettings('General')
                }}
              >
                <Icons.home className='size-4 text-sub' />
                Workspace
                <DropdownMenuShortcut>⌘2</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogOut}>
              <Icons.logOut className='size-4 text-sub' />
              <span className='text-sm'>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <Settings
        user={user}
        defaultItem={settingsDefaultItem}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </SidebarMenu>
  )
}
