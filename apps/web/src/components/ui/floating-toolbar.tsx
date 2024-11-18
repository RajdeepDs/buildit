'use client'

import type { FilterQuery } from '@/lib/store/filter-store'

import { Separator } from '@buildit/ui/separator'

import BulkIssueBox from '@/components/ui/bulk-issue-box'
import CustomizeFilter from '@/components/ui/customize-filter'

/**
 * Floating toolbar component. This component is used to display all the display and other filter functionalities.
 * @param props The props object
 * @param props.filters The filter prop
 * @param props.selectedItems The selected Items
 * @returns JSX.Element
 */
export default function FloatingToolbar({
  filters,
  selectedItems,
}: {
  filters: FilterQuery[]
  selectedItems: string[]
}): JSX.Element {
  return (
    <div className='bg-white p-2 border rounded-md z-50 shadow'>
      <div className='flex items-center gap-2'>
        {selectedItems.length > 0 && (
          <>
            <BulkIssueBox selectedItemsCount={selectedItems.length} />
            {filters.length !== 0 && (
              <Separator orientation='vertical' className='h-7' />
            )}
          </>
        )}
        {/* TODO: Fix Customize filter for `issues` and `projects` pages. */}
        {filters.map((filter) => (
          <CustomizeFilter
            key={Object.keys(filter).join('-')}
            filter={filter}
          />
        ))}
      </div>
    </div>
  )
}
