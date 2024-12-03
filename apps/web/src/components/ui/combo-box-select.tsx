import { useState } from 'react'

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
 * It integrates directly with react-hook-form via Controller.
 * @param props The ComboBoxSelect component props.
 * @param props.property The property of the ComboBoxSelect.
 * @param props.options The list of options to select from.
 * @param props.field The react-hook-form field provided by Controller.
 * @param props.field.value The current value of the ComboBoxSelect.
 * @param props.field.onChange The function to update the value of the ComboBoxSelect.
 * @returns JSX component.
 */
export default function ComboBoxSelect({
  property,
  options,
  field,
}: {
  property: 'Status' | 'Priority' | 'Assignee' | 'Teams' | 'Project'
  options: {
    value: string
    label: string | null
    image?: string | null
    icon: string
    color?: string
  }[]
  field: {
    value: string
    onChange: (value: string) => void
  }
}) {
  const [open, setOpen] = useState<boolean>(false)

  const getIconName = () => {
    switch (property) {
      case 'Status':
        return (
          options.find((option) => option.value === field.value)?.icon ??
          'backlog'
        )
      case 'Priority':
        return (
          options.find((option) => option.value === field.value)?.icon ??
          'signalHigh'
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
    const newValue = currentValue === field.value ? '' : currentValue
    setOpen(false)
    field.onChange(newValue)
  }

  const getTriggerColor = (value: string) => {
    if (!value) return 'text-sub'
    const option = options.find((option) => option.value === value)
    return option?.color ?? 'text-sub'
  }

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuButton
            className='w-full'
            aria-label={`Select ${property.toLowerCase()}`}
          >
            {field.value ? (
              options.find((option) => option.value === field.value)?.icon ===
              'image' ? (
                <Avatar className='size-4'>
                  <AvatarImage
                    src={
                      'image' in
                      (options.find((option) => option.value === field.value) ??
                        {})
                        ? (
                            options.find(
                              (option) => option.value === field.value,
                            ) as {
                              image: string
                            }
                          ).image
                        : ''
                    }
                  />
                  <AvatarFallback>
                    <Icons.userCircle2 className='size-4 text-sub' />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Icon className={`size-4 ${getTriggerColor(field.value)}`} />
              )
            ) : (
              <Icon className='size-4 text-sub' />
            )}
            <span className={cn('truncate', !field.value && 'text-sub')}>
              {field.value
                ? options.find((option) => option.value === field.value)?.label
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
                      onSelect={() => {
                        handleSelect(option.value)
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
                        <OptionIcon
                          className={cn(
                            'size-4 text-sub mr-2',
                            getTriggerColor(option.value),
                          )}
                        />
                      )}
                      {option.label}
                      <Icons.checkIcon
                        className={cn(
                          'size-4 text-sub ml-auto',
                          field.value === option.value
                            ? 'opacity-100'
                            : 'opacity-0',
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
