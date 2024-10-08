'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'

import { Icons } from '@/components/ui/icons'
import { useFloatingToolbar } from '@/hooks/store'
import { useNavigation } from '@/hooks/use-navigation'
import { api } from '@/lib/trpc/react'

/**
 * The header of the entire layout of the application.
 * @param props The props to the header.
 * @param props.open The state of the sidebar.
 * @param props.onOpenChange The function to change the state of the sidebar.
 * @param props.hover The state of the hover.
 * @param props.onHoverChange The function to change the state of the hover.
 * @returns The header of the application.
 */
export default function Header({
  open,
  onOpenChange,
  hover,
  onHoverChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  hover: boolean
  onHoverChange: (open: boolean) => void
}): JSX.Element {
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
  const HeaderIcon = useMemo(
    () => Icons[currentNavigation?.icon as keyof typeof Icons],
    [currentNavigation],
  )

  return (
    <header className='grid grid-cols-5 items-center py-2 px-3'>
      <Button
        variant={'ghost'}
        size={'icon'}
        className='size-6 hover:bg-soft'
        onClick={() => {
          onOpenChange(!open)
        }}
        onMouseEnter={() => {
          onHoverChange(!hover)
        }}
      >
        <Icons.panelLeft className='size-4 text-sub' />
      </Button>

      <nav className='flex items-center col-start-3 justify-center gap-2'>
        {<HeaderIcon className='size-4 text-sub' />}
        {isTeamPage && teamName && (
          <>
            <h1 className='text-sm font-medium text-sub'>{teamName}</h1>
            <Icons.chevronRight className='size-4 text-sub' />
          </>
        )}
        <h1 className='text-sm font-medium text-sub'>{title}</h1>
      </nav>

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
