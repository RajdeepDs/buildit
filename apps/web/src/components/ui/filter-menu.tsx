'use client'

import React from 'react'

import type { Store } from '@/lib/store/my-issues-store'

import { Button } from '@buildit/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'

import CustomizeFilter from './customize-filter'

/**
 * The filter menu component. It contains the filter by status and filter by priority.
 * @param props The component props.
 * @param props.store The store.
 * @returns The filter menu component.
 */
export default function FilterMenu({ store }: { store: Store }) {
  const [open, setOpen] = React.useState(false)

  const handleSelectStatus = (status: string) => {
    store.setFilterByStatus(status)
    setOpen(false)
  }
  const handleSelectPriority = (priority: string) => {
    store.setFilterByPriority(priority)
    setOpen(false)
  }

  const filteredStatus = store.filterByStatus
  const filteredPriority = store.filterByPriority

  const selectedStatus = statuses.find(
    (status) => status.value === filteredStatus,
  )?.label

  const selectedPriority = priorities.find(
    (priority) => priority.value === filteredPriority,
  )?.label

  return (
    <div className='flex items-center space-x-4'>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={'secondary'} className='text-sub' size={'sm'}>
            <Icons.listFilter className='h-4 w-4 mr-2 text-sub' />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-[200px]'>
          <DropdownMenuItem
            onClick={() => {
              handleSelectStatus('backlog')
            }}
          >
            <Icons.status className='mr-2 h-4 w-4 text-sub' />
            Status
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleSelectPriority('no priority')
            }}
          >
            <Icons.signalHigh className='mr-2 h-4 w-4 text-sub' />
            Priority
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {filteredStatus && (
        <CustomizeFilter
          filterType='Status'
          selectedFilter={selectedStatus ?? ''}
          onFilterChange={handleSelectStatus}
        />
      )}
      {filteredPriority && (
        <CustomizeFilter
          filterType='Priority'
          selectedFilter={selectedPriority ?? ''}
          onFilterChange={handleSelectPriority}
        />
      )}
    </div>
  )
}
