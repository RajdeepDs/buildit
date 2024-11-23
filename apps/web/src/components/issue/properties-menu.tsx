'use client'

import { useRef, useState } from 'react'

import type { ReactNode } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@buildit/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'

import { Icons } from '@/components/ui/icons'
import {
  useAssigneeOptions,
  useProjectOptions,
} from '@/configs/filter/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/filter/issues-config'
import { getIcon } from '@/lib/get-icons'

/**
 * PropertiesMenu component. This component is used to display the menu-options for particular property.
 * @param props The props for the PropertiesMenu component.
 * @param props.children The trigger of the PropertiesMenu component.
 * @param props.property The property name for which the menu-options are to be displayed.
 * @param props.handleSelect The function to be called when an option is selected.
 * @param props.handleActiveItem The function to be called when an item is active.
 * @returns JSX.Element
 */
export default function PropertiesMenu({
  children,
  property,
  handleSelect,
  handleActiveItem,
}: {
  children: ReactNode
  property: 'status' | 'priority' | 'team' | 'assignee' | 'project'
  handleSelect: (value: string) => void
  handleActiveItem: (value: string) => void
}): JSX.Element {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const commandRef = useRef<HTMLDivElement>(null)

  const assigneeOptions = useAssigneeOptions()

  const projectsOptions = useProjectOptions()

  const getCurrentOptions = () => {
    switch (property) {
      case 'status':
        return statusConfig
      case 'priority':
        return priorityConfig
      case 'assignee':
        return assigneeOptions
      case 'project':
        return projectsOptions
      default:
        return []
    }
  }

  const currentOptions = getCurrentOptions()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='flex items-center gap-2 w-full'>
        {children}
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start' side='left'>
        <Command ref={commandRef}>
          <CommandInput
            placeholder={`Search ${property}...`}
            className='px-0'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No {property} found.</CommandEmpty>
            <CommandGroup>
              {property === 'assignee' && (
                <>
                  <CommandItem
                    key='unassigned'
                    onSelect={() => {
                      handleSelect('unassigned')
                      setOpen(false)
                      handleActiveItem('')
                    }}
                  >
                    <Icons.userCircle2 className='size-4 text-sub mr-2' />
                    No Assignee
                  </CommandItem>
                  <CommandSeparator className='my-1 bg-soft/50' />
                </>
              )}
              {property === 'project' && (
                <>
                  <CommandItem
                    key='no project'
                    onSelect={() => {
                      handleSelect('no project')
                      setOpen(false)
                      handleActiveItem('')
                    }}
                  >
                    <Icons.hexagon className='size-4 text-sub mr-2' />
                    No Project
                  </CommandItem>
                  <CommandSeparator className='my-1 bg-soft/50' />
                </>
              )}
              {currentOptions.length > 0 ? (
                currentOptions.map((option) => {
                  const Icon = getIcon(option.icon)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        handleSelect(option.value)
                        setOpen(false)
                        handleActiveItem('')
                      }}
                    >
                      {option.icon === 'image' ? (
                        <Avatar className='size-4 mr-2'>
                          {'image' in option && (
                            <AvatarImage src={option.image ?? ''} />
                          )}
                          <AvatarFallback>
                            <Icons.userCircle2 className='size-4 text-sub' />
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <>{Icon && <Icon className='size-4 text-sub mr-2' />}</>
                      )}
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
