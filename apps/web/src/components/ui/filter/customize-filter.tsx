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

import { Icons } from '@/components/ui/icons'
import {
  useAssigneeOptions,
  useLeadOptions,
  useTeamsOptions,
} from '@/configs/filter/filter-settings'
import useFilterOptions from '@/hooks/filters/use-filter-options'
import { useFilterStore } from '@/hooks/store'
import { getIcon } from '@/lib/get-icons'

/**
 * The customize filter component, to modify the existing filters
 * @param props The props object
 * @param props.filter The Filter prop
 * @returns React component
 */
export default function CustomizeFilter({ filter }: { filter: FilterQuery }) {
  const teamOptions = useTeamsOptions()
  const assigneeOptions = useAssigneeOptions()
  const leadOptions = useLeadOptions()

  const { updateFilter, removeFilter } = useFilterStore()

  const filterDetails = useMemo(() => traverseFilterQuery(filter), [filter])
  const filterKey = filterDetails.map((detail) => detail.key).join('-')
  const filterOperator = filterDetails
    .map((detail) => detail.operator)
    .join('-')
  const filterValue = filterDetails.map((detail) => detail.value).join('-')

  const { statusOptions, priorityOptions } = useFilterOptions()

  const filterOptions = useMemo(() => {
    if (filterKey === 'status') return statusOptions
    if (filterKey === 'priority') return priorityOptions
    if (filterKey === 'team') return teamOptions
    if (filterKey === 'assignee') {
      if (assigneeOptions) {
        return [
          ...assigneeOptions,
          {
            value: null,
            label: 'No assignee',
            icon: 'userCircle2',
          },
        ]
      }
    }
    if (filterKey === 'lead') {
      if (leadOptions) {
        return [
          ...leadOptions,
          {
            value: null,
            label: 'No lead',
            icon: 'userCircle2',
          },
        ]
      }
    }

    return []
  }, [
    filterKey,
    statusOptions,
    priorityOptions,
    teamOptions,
    assigneeOptions,
    leadOptions,
  ])

  const handleSelectFilter = useCallback(
    (value: string | null) => {
      if (value === '') {
        removeFilter(filterKey)
      } else {
        updateFilter(filterKey, 'in', [value])
      }
    },
    [filterKey, removeFilter, updateFilter],
  )

  const filterIcon = () => {
    switch (filterKey) {
      case 'status':
        return 'backlog'
      case 'priority':
        return 'signalHigh'
      case 'team':
        return 'team'
      case 'assignee':
        return 'userCircle2'
      case 'lead':
        return 'userCircle2'
      default:
        return 'listFilter'
    }
  }

  const filterOption = filterOptions.find((filter) => {
    if (filter.value === null) {
      return {
        value: filter.value,
        label: filter.label,
        icon: filter.icon,
      }
    } else {
      return filter.value === filterValue
    }
  })

  const FilterIcon = getIcon(filterIcon())

  const FilterOptionLabel = filterOption?.label ?? 'Select Value'

  const FilterOptionIcon = getIcon(filterOption?.icon)

  return (
    <div className='flex items-center rounded-md border text-sm divide-x'>
      <div className='flex items-center gap-2 text-sub px-3 py-1'>
        {FilterIcon && <FilterIcon className='size-4 text-sub' />}
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
            <>
              {FilterOptionIcon && (
                <FilterOptionIcon className='size-4 text-sub' />
              )}
            </>
          )}
          {FilterOptionLabel}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {filterOptions.map((option) => {
            const Icon = getIcon(option.icon)
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  handleSelectFilter(option.value ?? null)
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
                  <>{Icon && <Icon className='size-4 text-sub mr-2' />}</>
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
