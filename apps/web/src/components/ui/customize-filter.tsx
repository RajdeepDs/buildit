'use client'

import { useCallback, useMemo } from 'react'

import type { FilterQuery } from '@/lib/store/filter-store'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'

import {
  priorityOptions,
  statusOptions,
  useAssigneeOptions,
  useTeamsOptions,
} from '@/configs/filter-settings'
import { useFilterStore } from '@/hooks/store'

import { Icons } from './icons'

/**
 * The customize filter component, to modify the existing filters
 * @param props The props object
 * @param props.filter The Filter prop
 * @returns React component
 */
export default function CustomizeFilter({ filter }: { filter: FilterQuery }) {
  const teamOptions = useTeamsOptions()
  const assigneeOptions = useAssigneeOptions()
  const { updateFilter, removeFilter } = useFilterStore()

  const filterDetails = useMemo(() => traverseFilterQuery(filter), [filter])
  const filterKey = filterDetails.map((detail) => detail.key).join('-')
  const filterOperator = filterDetails
    .map((detail) => detail.operator)
    .join('-')
  const filterValue = filterDetails.map((detail) => detail.value).join('-')

  const filterOptions = useMemo(() => {
    if (filterKey === 'status') return statusOptions
    if (filterKey === 'priority') return priorityOptions
    if (filterKey === 'teams') return teamOptions
    if (filterKey === 'assignee') return assigneeOptions
    return []
  }, [filterKey, teamOptions, assigneeOptions])

  const handleSelectFilter = useCallback(
    (value: string) => {
      if (value === '') {
        removeFilter(filterKey)
      } else {
        updateFilter(filterKey, 'in', value)
      }
    },
    [filterKey, removeFilter, updateFilter],
  )

  const getIcon = (iconName: string | undefined) => {
    return iconName !== 'image'
      ? Icons[iconName as keyof typeof Icons]
      : Icons.listFilter
  }
  const filterType = filterOptions.find(
    (filter) => filter.value === filterValue,
  )

  const FilterIcon = getIcon(filterType?.icon)

  const filterOption = filterOptions.find(
    (option) => option.value === filterValue,
  )

  const FilterOptionLabel = filterOption?.label ?? 'Select Value'

  const FilterOptionIcon = getIcon(filterOption?.icon)

  return (
    <div className='flex items-center rounded-md border text-sm divide-x'>
      <div className='flex items-center gap-2 text-sub px-3 py-1'>
        <FilterIcon className='size-4 text-sub' />
        {filterKey}
      </div>
      <p className='cursor-default text-sub px-3 py-1'>
        {filterOperator === 'in' ? <>is</> : <>{filterOperator}</>}{' '}
      </p>
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

interface FilterDetail {
  key: string
  operator: string
  value: any
}

const traverseFilterQuery = (query: FilterQuery): FilterDetail[] => {
  const result: FilterDetail[] = []

  if (!query || typeof query !== 'object') return result

  Object.keys(query).forEach((key) => {
    const value = query[key]

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // This is a FilterCondition object
      Object.keys(value).forEach((operator) => {
        const conditionValue = value[operator]
        result.push({
          key,
          operator,
          value: conditionValue,
        })
      })
    } else if (typeof value === 'object') {
      console.log(`Nested query for key: ${key}`)
      result.push(...traverseFilterQuery(value as FilterQuery))
    }
  })

  return result
}
