'use client'

import type { Filter } from '@/lib/store/my-issues-store'

import { Button } from '@buildit/ui/button'
import { Separator } from '@buildit/ui/separator'

import { Icons } from '@/components/ui/icons'

import CustomizeFilter from './customize-filter'

/**
 * Floating toolbar component. This component is used to display all the display and other filter functionalities.
 * @param props The props object
 * @param props.filters The filter prop
 * @returns JSX.Element
 */
export default function FloatingToolbar({
  filters,
}: {
  filters: Filter[]
}): JSX.Element {
  return (
    <div className='bg-weak/20 p-2 border rounded-md shadow-md z-50'>
      <div className='flex items-center gap-2'>
        {filters.map((filter) => (
          <CustomizeFilter key={filter.filter} filter={filter} />
        ))}
        {filters.length > 0 && (
          <Separator orientation='vertical' className='h-6' />
        )}
        <Button size={'sm'} variant={'secondary'} className='text-sub'>
          <Icons.plus className='size-4 mr-2 text-sub' />
          Create Issue
        </Button>
      </div>
    </div>
  )
}
