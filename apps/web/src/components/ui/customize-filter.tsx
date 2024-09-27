'use client'

import { useCallback, useMemo } from 'react'

import type { Filter } from '@/lib/store/my-issues-store'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'
import { Separator } from '@buildit/ui/separator'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'
import { useMyIssues } from '@/hooks/store'

/**
 * The customize filter component, to modify the existing filters
 * @param props The props object
 * @param props.filter The Filter prop
 * @returns React component
 */
export default function CustomizeFilter({ filter }: { filter: Filter }) {
  const { addOrUpdateFilter, removeFilter } = useMyIssues()
  const selectedFilter = filter.filter
  const selectedValue = filter.value

  const filterOptions = useMemo(() => {
    if (selectedFilter === 'status') return statuses
    if (selectedFilter === 'priority') return priorities
    return []
  }, [selectedFilter])

  const handleSelectFilter = useCallback(
    (value: string) => {
      if (value === '') {
        removeFilter(selectedFilter)
      } else {
        addOrUpdateFilter({ filter: selectedFilter, value })
      }
    },
    [selectedFilter, removeFilter, addOrUpdateFilter],
  )

  const getIcon = (iconName: string) => {
    return Icons[iconName as keyof typeof Icons]
  }

  if (!selectedFilter) {
    return null
  }

  return (
    <div className='flex items-center space-x-1 rounded-md border px-1 text-sm'>
      <p className='cursor-default'>{selectedFilter}</p>
      <Separator orientation='vertical' className='h-5' />
      <p className='cursor-default'>is</p>
      <Separator orientation='vertical' className='h-5' />
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none' aria-haspopup='listbox'>
          {selectedValue || 'Select Value'}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filterOptions.map((option) => {
            const Icon = getIcon(option.icon)
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  handleSelectFilter(option.value)
                }}
              >
                <Icon className='mr-2 h-4 w-4 text-sub' />
                {option.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation='vertical' className='h-5' />
      <Icons.canceled
        className='h-4 w-4 cursor-pointer text-sub'
        aria-label='Remove filter'
        onClick={() => {
          handleSelectFilter('')
        }}
      />
    </div>
  )
}
