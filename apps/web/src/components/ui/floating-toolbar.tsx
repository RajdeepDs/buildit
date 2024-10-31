'use client'

import { useEffect, useState } from 'react'

import type { FilterQuery } from '@/lib/store/filter-store'

import { Button } from '@buildit/ui/button'
import { Separator } from '@buildit/ui/separator'

import { NewIssueModal } from '@/components/modals/new-issue-modal'
import BulkIssueBox from '@/components/ui/bulk-issue-box'
import CustomizeFilter from '@/components/ui/customize-filter'
import { Icons } from '@/components/ui/icons'

/**
 * Floating toolbar component. This component is used to display all the display and other filter functionalities.
 * @param props The props object
 * @param props.filters The filter prop
 * @param props.selectedIssues The selected issues
 * @returns JSX.Element
 */
export default function FloatingToolbar({
  filters,
  selectedIssues,
}: {
  filters: FilterQuery[]
  selectedIssues: string[]
}): JSX.Element {
  const [currentFilters, setCurrentFilters] = useState(filters)

  useEffect(() => {
    setCurrentFilters(filters)
  }, [filters])

  return (
    <div className='bg-weak/20 p-2 border rounded-md z-50 shadow'>
      <div className='flex items-center gap-2'>
        {selectedIssues.length > 0 && (
          <BulkIssueBox selectedIssuesCount={selectedIssues.length} />
        )}
        {currentFilters.map((filter) => (
          <CustomizeFilter
            key={Object.keys(filter).join('-')}
            filter={filter}
          />
        ))}
        {currentFilters.length > 0 ||
          (selectedIssues.length > 0 && (
            <Separator orientation='vertical' className='h-7' />
          ))}
        <NewIssueModal>
          <Button size={'sm'} variant={'secondary'} className='text-sub h-8'>
            <Icons.plus className='size-4 mr-2 text-sub' />
            Create Issue
          </Button>
        </NewIssueModal>
      </div>
    </div>
  )
}
