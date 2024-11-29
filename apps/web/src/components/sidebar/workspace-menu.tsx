import { useState, useTransition } from 'react'

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
 * The workspace menu component.
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

  const onLogOut = () => {
    startTransition(async () => {
      await logout()
    })
    setOpen(false)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
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
                }}
              >
                <Settings user={user} defaultItem='My profile'>
                  <Icons.settings className='size-4 text-sub' />
                  Settings
                </Settings>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                }}
              >
                <Settings user={user} defaultItem='General'>
                  <Icons.home className='size-4 text-sub' />
                  Workspace
                </Settings>
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
    </SidebarMenu>
  )
}
