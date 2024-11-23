import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@buildit/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@buildit/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'

import { Icons } from '@/components/ui/icons'
import { useFilterStore } from '@/hooks/store'
import { getIcon } from '@/lib/get-icons'

export interface Filter {
  key: string
  label: string
  icon: string
  options: FilterOption[]
}

export interface FilterOption {
  value: string | undefined | null
  label: string | null | undefined
  icon?: JSX.Element | string
  count?: number | undefined
}

interface FilterMenuProps {
  filters: Filter[]
}

/**
 * The filter menu component. This component is used to filter the issues.
 * @param props The filter menu props.
 * @param props.filters The filter options.
 * @returns The filter menu component.
 */
export default function FilterMenu({ filters }: FilterMenuProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const commandRef = useRef<HTMLDivElement>(null)
  const [selectedFilterKey, setSelectedFilterKey] = useState<
    Filter['key'] | null
  >(null)
  const [_, setSelectedValue] = useState('')

  const { setFilter } = useFilterStore()

  // The currently selected filter
  const selectedFilter = filters.find(
    (filter) => filter.key === selectedFilterKey,
  )

  const reset = useCallback(() => {
    setSelectedFilterKey(null)
    setSelectedValue('')
    setInputValue('')
  }, [])

  useEffect(() => {
    if (open) {
      reset()
    }
  }, [open, reset])

  const handleFilterSelect = useCallback((key: Filter['key']) => {
    setSelectedFilterKey(key)
    setSelectedValue('')
    setInputValue('')
  }, [])

  const handleOptionSelect = useCallback(
    (value: string | undefined) => {
      setSelectedValue(value!)
      if (selectedFilterKey) {
        setFilter(selectedFilterKey, 'in', [value])
      }
      setOpen(false)
    },
    [selectedFilterKey, setFilter],
  )

  const renderIcon = (icon: JSX.Element | string | undefined) => {
    if (React.isValidElement(icon)) {
      return icon
    } else if (typeof icon === 'string') {
      const IconComponent = getIcon(icon)
      return IconComponent ? (
        <IconComponent className='size-4 text-sub' />
      ) : null
    }
    return null
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='secondary'
          className='text-sub'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Filter Menu'
        >
          <Icons.listFilter className='size-4 text-sub mr-2' />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command ref={commandRef}>
          <CommandInput
            placeholder={`${selectedFilter?.label ?? 'filters'}...`}
            value={inputValue}
            onValueChange={setInputValue}
            className='px-0 placeholder:text-sm placeholder:font-normal placeholder:capitalize'
          />
          <CommandList>
            <CommandEmpty>
              No {selectedFilter?.label ?? 'filters'} found.
            </CommandEmpty>
            <CommandGroup>
              {!selectedFilter
                ? filters.map((filter) => {
                    const Icon = getIcon(filter.icon)
                    return (
                      <CommandItem
                        key={filter.key}
                        onSelect={() => {
                          handleFilterSelect(filter.key)
                        }}
                        className='flex items-center space-x-2'
                      >
                        {Icon && <Icon className='size-4 text-sub' />}
                        <span>{filter.label}</span>
                      </CommandItem>
                    )
                  })
                : selectedFilter.options.map((option) => {
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => {
                          handleOptionSelect(option.value)
                        }}
                        className='flex items-center justify-between space-x-2'
                      >
                        <div className='flex items-center space-x-2'>
                          {renderIcon(option.icon)}
                          <span>{option.label}</span>
                        </div>
                        {option.count !== undefined && (
                          <span className='text-xs text-sub'>
                            {option.count} issues
                          </span>
                        )}
                      </CommandItem>
                    )
                  })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
