'use client'

import { useTransition } from 'react'

import type { TUser, TWorkspace } from '@buildit/utils/types'

import { logout } from '@buildit/auth/actions/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Button } from '@buildit/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'

import { Icons } from '@/components/ui/icons'

interface SidebarHeaderNavProps {
  user: Pick<TUser, 'id' | 'name' | 'email' | 'image'>
  workspace: Pick<TWorkspace, 'name'>
}

/**
 * The workspace switcher component.
 * @param props The props object.
 * @param props.user The user object.
 * @param props.workspace The workspace object.
 * @returns The workspace switcher component.
 */
export default function WorkspaceSwitcher({
  user,
  workspace,
}: SidebarHeaderNavProps): JSX.Element {
  const [_, startTransition] = useTransition()

  const onLogOut = () => {
    startTransition(async () => {
      await logout()
    })
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className='w-fit px-1.5'>
              {user.image && (
                <Avatar className='size-5 rounded'>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
              )}
              <span className='font-medium text-strong'>{workspace.name}</span>
              <Icons.chevronDown className='ml-auto h-4 w-4 text-soft' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-60 bg-gray-50 p-0'
            align='start'
            side='bottom'
            sideOffset={4}
          >
            <div className='flex flex-col gap-2 p-2 bg-white'>
              <div className='flex items-start gap-2'>
                {user.image && (
                  <Avatar className='size-10 rounded'>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                )}
                <div className='flex flex-col items-start'>
                  <span className='font-medium text-sm text-surface'>
                    {workspace.name}
                  </span>
                  <div className='flex items-center gap-1'>
                    <span className='text-xs text-sub'>Free plan .</span>
                    <span className='text-xs text-sub'>1 member</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className='w-fit h-7 text-sub'
                >
                  <Icons.settings className='size-4 mr-2 text-sub' />
                  Settings
                </Button>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className='w-fit h-7 text-sub'
                >
                  <Icons.home className='size-4 mr-2 text-sub' />
                  Workspace
                </Button>
              </div>
            </div>
            <DropdownMenuSeparator className='bg-soft my-0' />
            <div className='flex flex-col gap-2 p-2 m-1'>
              <div className='flex items-center justify-between'>
                <span className='text-xs text-sub'>{user.email}</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'ghost'} size={'icon'} className='size-6'>
                      <Icons.horizontalMore className='size-4 text-sub' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-32 p-1 rounded-md'>
                    <button
                      className='w-full flex items-center gap-2 px-2 py-1 rounded hover:bg-weak cursor-default'
                      onClick={onLogOut}
                    >
                      <Icons.logOut className='size-4 text-sub' />
                      <span className='text-xs text-surface'>Log out</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex items-start gap-2'>
                {user.image && (
                  <Avatar className='size-5 rounded'>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name}</AvatarFallback>
                  </Avatar>
                )}
                <span className='text-sm text-sub'>{user.name}</span>
              </div>
            </div>
            <DropdownMenuSeparator className='bg-soft my-0' />
            <div className='m-1'>
              <DropdownMenuItem
                className='focus:bg-soft/50 text-surface'
                onClick={onLogOut}
              >
                <span className='text-sm'>Log out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
