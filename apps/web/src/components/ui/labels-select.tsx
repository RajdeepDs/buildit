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
 * @param props.onChange The callback function to trigger when the selected label changes.
 * @returns The LabelsSelect component.
 */
export default function LabelsSelect({
  property,
  options,
  onChange,
}: {
  property: 'Label'
  options: { value: string; label: string; icon: string }[]
  onChange: (selectedValues: string[]) => void
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

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

  const toggleValue = (value: string) => {
    setSelectedValues((prev: string[]) => {
      const updatedValues = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
      onChange(updatedValues)
      return updatedValues
    })
  }

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuButton className='w-full'>
            <span
              className={cn(
                'truncate flex items-center',
                selectedValues.length === 0 && 'text-sub',
              )}
            >
              <StatusDot className='mr-2 text-sub' />
              {selectedValues.length > 0
                ? selectedValues.length > 1
                  ? `${selectedValues.length} labels`
                  : `${selectedValues[0]}`
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
                  const isSelected = selectedValues.includes(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        toggleValue(option.value)
                      }}
                    >
                      <StatusDot className={cn('mr-2', color)} />
                      {option.label}
                      <Icons.checkIcon
                        className={cn(
                          'size-4 text-sub ml-auto',
                          isSelected ? 'opacity-100' : 'opacity-0',
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
