'use client'

import { useTransition } from 'react'
import Link from 'next/link'

import type { TWorkspace } from '@buildit/utils/types'

import { logout } from '@buildit/auth/actions/logout'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'

import { Icons } from '@/components/ui/icons'

/**
 * The avatar dropdown menu component.
 * @param props The props object.
 * @param props.workspace The workspace.
 * @returns The avatar dropdown menu component.
 */
export default function AvatarDropdownMenu({
  workspace,
}: {
  workspace: Pick<TWorkspace, 'name'>
}) {
  const [_, startTransition] = useTransition()

  const onLogOut = () => {
    startTransition(async () => {
      await logout()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-x-1 outline-none'>
        <span className='font-medium text-strong'>{workspace.name}</span>
        <Icons.chevronDown className='ml-2 h-4 w-4 text-soft' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mt-2 ml-3 w-[180px]'>
        <DropdownMenuItem asChild>
          <Link href={`/settings/`} className='space-x-2'>
            <Icons.user className='h-4 w-4 text-sub/80' />
            <p className='font-medium text-strong'>My Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/settings/general`} className='space-x-2'>
            <Icons.home className='h-4 w-4 text-sub/80' />
            <p className='font-medium text-strong'>My Workspace</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/settings/`} className='space-x-2'>
            <Icons.settings className='h-4 w-4 text-sub/80' />
            <p className='font-medium text-strong'>My settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/'} className='space-x-2'>
            <Icons.home className='h-4 w-4 text-sub/80' />
            <p className='font-medium text-strong'>Homepage</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/'} className='space-x-2'>
            <Icons.penLine className='h-4 w-4 text-sub/80' />
            <p className='font-medium text-strong'>Blogs</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/'} className='space-x-2'>
            <Icons.bookOpenText className='h-4 w-4 text-sub/80' />
            <p className='font-medium text-strong'>Changelogs</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogOut} className='space-x-2'>
          <Icons.logOut className='h-4 w-4 text-sub/80' />
          <p className='font-medium text-strong'>Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
