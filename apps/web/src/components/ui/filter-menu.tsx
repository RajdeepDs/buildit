'use client'

import { useEffect, useRef, useState } from 'react'

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

import {
  filterOptions,
  priorityOptions,
  statusOptions,
} from '@/configs/filter-settings'

import { Icons } from './icons'

/**
 * The filter menu component. It contains the filter by status and filter by priority.
 * @returns The filter menu component.
 */
export default function FilterMenu() {
  const [open, setOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('')
  const [selectedValue, setSelectedValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const commandRef = useRef<HTMLDivElement>(null)

  const handleFilterSelect = (currentValue: string) => {
    setSelectedFilter(currentValue)
    setSelectedValue('')
    setInputValue('')
  }

  const handleValueSelect = (currentValue: string) => {
    setSelectedValue(currentValue)
    setSelectedFilter('')
    setInputValue('')
    setOpen(false)
  }

  const getCurrentOptions = () => {
    switch (selectedFilter) {
      case 'status':
        return statusOptions
      case 'priority':
        return priorityOptions
      default:
        return filterOptions
    }
  }

  const handleSelect = (currentValue: string) => {
    if (!selectedFilter) {
      handleFilterSelect(currentValue)
    } else {
      handleValueSelect(currentValue)
    }
  }

  const resetFilter = () => {
    setSelectedFilter('')
    setSelectedValue('')
    setInputValue('')
    if (commandRef.current) {
      const inputElement = commandRef.current.querySelector('input')
      if (inputElement) {
        inputElement.value = ''
      }
    }
  }

  useEffect(() => {
    if (!open && selectedFilter && !selectedValue) {
      resetFilter()
    }
  }, [open, selectedFilter, selectedValue])

  const currentOptions = getCurrentOptions()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className='text-sub'
          size={'sm'}
          role='combobox'
          aria-expanded={open}
        >
          <Icons.listFilter className='size-4 text-sub mr-2' />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align={'start'}>
        <Command ref={commandRef}>
          <CommandInput
            placeholder={`Search ${selectedFilter || 'filter'}...`}
            className='px-0'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No {selectedFilter || 'filter'} found.</CommandEmpty>
            <CommandGroup>
              {currentOptions.length > 0 ? (
                currentOptions.map((option) => {
                  const Icon =
                    Icons[option.icon as keyof typeof Icons] || Icons.listFilter
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        handleSelect(option.value)
                      }}
                    >
                      <Icon className='size-4 text-sub mr-2' />
                      {option.label}
                    </CommandItem>
                  )
                })
              ) : (
                <CommandItem disabled>No options available</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
