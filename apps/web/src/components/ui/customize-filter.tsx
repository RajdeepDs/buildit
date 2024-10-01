'use client'

import { useCallback, useMemo } from 'react'

import type { Filter } from '@/lib/store/my-issues-store'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'

import { Icons } from '@/components/ui/icons'
import {
  filterOptions as Filters,
  priorityOptions,
  statusOptions,
  useAssigneeOptions,
  useTeamsOptions,
} from '@/configs/filter-settings'
import { useMyIssues } from '@/hooks/store'

/**
 * The customize filter component, to modify the existing filters
 * @param props The props object
 * @param props.filter The Filter prop
 * @returns React component
 */
export default function CustomizeFilter({ filter }: { filter: Filter }) {
  const { addOrUpdateFilter, removeFilter } = useMyIssues()
  const teamOptions = useTeamsOptions()
  const assigneeOptions = useAssigneeOptions()

  const selectedFilter = filter.filter
  const selectedValue = filter.value

  const filterOptions = useMemo(() => {
    if (selectedFilter === 'status') return statusOptions
    if (selectedFilter === 'priority') return priorityOptions
    if (selectedFilter === 'teams') return teamOptions
    if (selectedFilter === 'assignee') return assigneeOptions
    return []
  }, [selectedFilter, teamOptions, assigneeOptions])

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

  const getIcon = (iconName: string | undefined) => {
    return iconName !== 'image'
      ? Icons[iconName as keyof typeof Icons]
      : Icons.listFilter
  }

  if (!selectedFilter) {
    return null
  }

  const filterType = Filters.find((filter) => filter.value === selectedFilter)

  const FilterIcon = getIcon(filterType?.icon)

  const FilterLabel = filterType?.label ?? 'Unknown Filter'

  const filterOption = filterOptions.find(
    (option) => option.value === selectedValue,
  )

  const FilterOptionLabel = filterOption?.label ?? 'Select Value'

  const FilterOptionIcon = getIcon(filterOption?.icon)

  return (
    <div className='flex items-center rounded-md border text-sm divide-x'>
      <div className='flex items-center gap-2 text-sub px-3 py-1'>
        <FilterIcon className='size-4 text-sub' />
        {FilterLabel}
      </div>
      <p className='cursor-default text-sub px-3 py-1'>is</p>
      <DropdownMenu>
        <DropdownMenuTrigger
          className='outline-none flex items-center gap-2 px-3 py-1 hover:bg-weak'
          aria-haspopup='listbox'
        >
          {filterOption?.icon === 'image' ? (
            <Avatar className='size-4'>
              <AvatarImage src={(filterOption as { image: string }).image} />
              <AvatarFallback>
                <Icons.userCircle2 className='size-4 text-sub' />
              </AvatarFallback>
            </Avatar>
          ) : (
            <FilterOptionIcon className='size-4 text-sub' />
          )}
          {FilterOptionLabel}
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
                {option.icon === 'image' ? (
                  <Avatar className='size-4 mr-2'>
                    <AvatarImage src={(option as { image: string }).image} />
                    <AvatarFallback>
                      <Icons.userCircle2 className='size-4 text-sub' />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Icon className='size-4 text-sub mr-2' />
                )}
                {option.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        className='rounded-e-md py-1.5 px-2 hover:bg-weak'
        aria-label='Remove filter'
        onClick={() => {
          handleSelectFilter('')
        }}
      >
        <Icons.x className='size-4 text-sub' />
      </button>
    </div>
  )
}
