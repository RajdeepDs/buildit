'use client'

import { usePathname } from 'next/navigation'

import { Button } from '@buildit/ui/button'

import { Icons } from '@/components/ui/icons'
import { getNavigations } from '@/configs/layout-navigations'

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

  const navigations = getNavigations()

  const currentNavigation = navigations.find(
    (navigation) => navigation.href === pathname,
  )

  const title = currentNavigation?.name
  const HeaderIcon = Icons[currentNavigation?.icon as keyof typeof Icons]

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
        <HeaderIcon className='size-4 text-sub' />
        <h1 className='text-sm font-medium text-sub'>{title}</h1>
      </nav>
    </header>
  )
}
