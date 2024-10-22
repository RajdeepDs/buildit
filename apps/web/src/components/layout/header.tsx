'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
import { Separator } from '@buildit/ui/separator'
import { SidebarTrigger } from '@buildit/ui/sidebar'

import { Icons } from '@/components/ui/icons'
import { useFloatingToolbar } from '@/hooks/store'
import { useNavigation } from '@/hooks/use-navigation'
import { api } from '@/lib/trpc/react'

/**
 * The header of the entire layout of the application.
 * @returns The header of the application.
 */
export default function Header(): JSX.Element {
  const pathname = usePathname()

  const teamId = useMemo(() => pathname.split('/')[2], [pathname])

  const { currentNavigation, isTeamPage } = useNavigation(pathname)

  // Fetch team data only if on a team page and teamId is available
  const { data: teamQuery } = api.team.get_team_by_teamId.useQuery(
    { teamId: teamId! },
    { enabled: !!teamId && isTeamPage },
  )
  const teamName = teamQuery?.name ?? teamId

  const { isOpen, setOpen } = useFloatingToolbar()

  const title = useMemo(() => currentNavigation?.name, [currentNavigation])

  return (
    <header className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='h-5 mr-1' />
        <nav className='flex items-center col-start-3 justify-center gap-2'>
          {isTeamPage && teamName && (
            <>
              <h1 className='text-sm font-medium text-sub'>{teamName}</h1>
              <Icons.chevronRight className='size-4 text-sub' />
            </>
          )}
          <h1 className='text-sm font-medium text-sub'>{title}</h1>
        </nav>
      </div>

      {/* Floating toolbar button */}
      <div className='flex col-start-5 items-center justify-end'>
        <Button
          variant={'ghost'}
          size={'icon'}
          className={cn('size-6 hover:bg-soft', isOpen && 'bg-soft')}
          onClick={() => {
            setOpen(!isOpen)
          }}
        >
          <Icons.menu className='size-4 text-sub' />
        </Button>
      </div>
    </header>
  )
}
