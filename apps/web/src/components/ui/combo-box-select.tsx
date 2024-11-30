import { useState } from 'react'

import type { FilterSettings } from '@buildit/utils/types/configs'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { cn } from '@buildit/ui/cn'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@buildit/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'
import { SidebarMenuButton } from '@buildit/ui/sidebar'

import { Icons } from '@/components/ui/icons'

/**
 * The ComboBoxSelect component is used to select an option from a list of options.
 * It displays the selected option.
 * @param props The ComboBoxSelect component props.
 * @param props.property The property of the ComboBoxSelect.
 * @param props.options The list of options to select from.
 * @param props.onChange  The callback function to trigger when the selected option changes.
 * @returns The ComboBoxSelect component.
 */
export default function ComboBoxSelect({
  property,
  options,
  onChange,
}: {
  property: 'Status' | 'Priority' | 'Assignee' | 'Teams' | 'Project'
  options:
    | FilterSettings[]
    | {
        value: string
        label: string | null
        image: string | null
        icon: string
      }[]
  onChange: (value: string) => void // Add this prop
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  const getIconName = () => {
    switch (property) {
      case 'Status':
        return (
          options.find((option) => option.value === value)?.icon ?? 'backlog'
        )
      case 'Priority':
        return (
          options.find((option) => option.value === value)?.icon ?? 'signalHigh'
        )
      case 'Assignee':
        return 'userCircle2'
      case 'Project':
        return 'hexagon'
      case 'Teams':
        return 'team'
      default:
        return ''
    }
  }

  const Icon = Icons[getIconName() as keyof typeof Icons]

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? '' : currentValue
    setValue(newValue)
    setOpen(false)
    onChange(newValue) // Trigger the callback
  }

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuButton
            className='w-full'
            aria-label={`Select ${property.toLowerCase()}`}
          >
            {value ? (
              options.find((option) => option.value === value)?.icon ===
              'image' ? (
                <Avatar className='size-4 mr-2'>
                  <AvatarImage
                    src={
                      'image' in
                      (options.find((option) => option.value === value) ?? {})
                        ? (
                            options.find(
                              (option) => option.value === value,
                            ) as { image: string }
                          ).image
                        : ''
                    }
                  />
                  <AvatarFallback>
                    <Icons.userCircle2 className='size-4 text-sub' />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Icon className='size-4 text-sub' />
              )
            ) : (
              <Icon className='size-4 text-sub' />
            )}
            <span className={cn('truncate', !value && 'text-sub')}>
              {value
                ? options.find((option) => option.value === value)?.label
                : `Select ${property.toLowerCase()}`}
            </span>
          </SidebarMenuButton>
        </PopoverTrigger>
        <PopoverContent
          className='w-[200px] min-w-[var(--radix-popper-anchor-width)] p-0'
          align='start'
        >
          <Command>
            <CommandInput
              className='px-0'
              placeholder={`Search ${property.toLowerCase()}...`}
            />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const OptionIcon = Icons[option.icon as keyof typeof Icons]
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleSelect}
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
                        <OptionIcon
                          className={cn(
                            'size-4 text-sub mr-2',
                            option.value === 'todo' && 'text-soft',
                            option.value === 'in progress' && 'text-yellow-500',
                            option.value === 'done' && 'text-blue-500',
                            option.value === 'canceled' && 'text-red-500',
                          )}
                        />
                      )}
                      {option.label}
                      <Icons.checkIcon
                        className={cn(
                          'size-4 text-sub ml-auto',
                          value === option.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
