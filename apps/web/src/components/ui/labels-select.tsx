import { useState } from 'react'

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
 * The StatusDot component is used to display a status dot.
 * @param props The StatusDot component props.
 * @param props.className The class name of the status dot.
 * @returns The StatusDot component.
 */
function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width='8'
      height='8'
      fill='currentColor'
      viewBox='0 0 8 8'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-hidden='true'
    >
      <circle cx='4' cy='4' r='4' />
    </svg>
  )
}

/**
 * The LabelsSelect component is used to select a label from a list of options.
 * It displays the selected label.
 * @param props The LabelsSelect component props.
 * @param props.property The property of the LabelsSelect.
 * @param props.options The list of options to select from.
 * @returns The LabelsSelect component.
 */
export default function LabelsSelect({
  property,
  options,
}: {
  property: 'Label'
  options: { value: string; label: string; icon: string }[]
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const getColor = (value: string) => {
    switch (value) {
      case 'bug':
        return 'text-red-500'
      case 'feature':
        return 'text-blue-400'
      case 'enhancement':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }
  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuButton className='w-full'>
            <span
              className={cn('truncate flex items-center', !value && 'text-sub')}
            >
              <StatusDot className={cn('h-2 w-2 mr-2', getColor(value))} />
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
                  const color = getColor(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue)
                        setOpen(false)
                      }}
                    >
                      <StatusDot className={cn('mr-2', color)} />
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
