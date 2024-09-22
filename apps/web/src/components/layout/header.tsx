'use client'

import { usePathname } from 'next/navigation'

import { Button } from '@buildit/ui/button'

import { getNavigations } from '@/configs/layout-navigations'

import { Icons } from '../ui/icons'

/**
 * The header of the entire layout of the application.
 * @returns The header of the application.
 */
export default function Header(): JSX.Element {
  const pathname = usePathname()

  const navigations = getNavigations()

  const currentNavigation = navigations.find(
    (navigation) => navigation.href === pathname,
  )

  const title = currentNavigation?.name
  const HeaderIcon = Icons[currentNavigation?.icon as keyof typeof Icons]

  return (
    <header className='grid grid-cols-5 items-center py-2'>
      <Button variant={'ghost'} size={'icon'} className='size-6 hover:bg-soft'>
        <Icons.panelLeft className='size-4 text-sub' />
      </Button>
      <nav className='flex items-center col-start-3 justify-center gap-2'>
        <HeaderIcon className='size-4 text-sub' />
        <h1 className='text-sm font-medium text-sub'>{title}</h1>
      </nav>
    </header>
  )
}
