'use client'

import { useEffect, useState } from 'react'

import type { FilterQuery } from '@/lib/store/filter-store'

import { Button } from '@buildit/ui/button'
import { Separator } from '@buildit/ui/separator'

import { Icons } from '@/components/ui/icons'

import { NewIssueModal } from '../modals/new-issue-modal'
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
  filters: FilterQuery[]
}): JSX.Element {
  const [currentFilters, setCurrentFilters] = useState(filters)

  useEffect(() => {
    setCurrentFilters(filters)
  }, [filters])

  return (
    <div className='bg-weak/20 p-2 border rounded-md shadow-md z-50'>
      <div className='flex items-center gap-2'>
        {currentFilters.map((filter) => (
          <CustomizeFilter
            key={Object.keys(filter).join('-')}
            filter={filter}
          />
        ))}
        {currentFilters.length > 0 && (
          <Separator orientation='vertical' className='h-6' />
        )}
        <NewIssueModal>
          <Button size={'sm'} variant={'secondary'} className='text-sub'>
            <Icons.plus className='size-4 mr-2 text-sub' />
            Create Issue
          </Button>
        </NewIssueModal>
      </div>
    </div>
  )
}
