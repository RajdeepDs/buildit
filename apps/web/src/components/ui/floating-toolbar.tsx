'use client'

import { Button } from '@buildit/ui/button'
import { Separator } from '@buildit/ui/separator'

import { Icons } from '@/components/ui/icons'

import FilterMenu from './filter-menu'

/**
 * Floating toolbar component. This component is used to display all the display and other filter functionalities.
 * @returns JSX.Element
 */
export default function FloatingToolbar(): JSX.Element {
  return (
    <div className='bg-weak/20 p-2 border rounded-md shadow-md z-50'>
      <div className='flex items-center gap-2'>
        <Button size={'icon'} variant={'secondary'} className='h-8 rounded'>
          <Icons.plus className='size-4 text-sub' />
        </Button>
        <Separator orientation='vertical' className='h-6' />
        <FilterMenu />
        <Button
          size={'sm'}
          variant={'secondary'}
          className='rounded gap- hidden'
        >
          <Icons.listFilter className='size-4 text-sub' />
          <p className='text-sub'>Filter</p>
        </Button>
        <Button size={'sm'} variant={'secondary'} className='rounded gap-1'>
          <Icons.settings className='size-4 text-sub' />
          <p className='text-sub'>Display</p>
        </Button>
      </div>
    </div>
  )
}
