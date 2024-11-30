// Dependencies: pnpm install lucide-react

'use client'

import { useState } from 'react'

import { Check } from 'lucide-react'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
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
import { SidebarMenuButton } from '@buildit/ui/sidebar'

import { Icons } from '@/components/ui/icons'

/**
 * The organizations that can be selected.
 * @param props - The props.
 * @param props.projects - The projects.
 * @returns JSX.Element
 */
export default function ProjectSelect({
  projects,
}: {
  projects: { label: string; value: string; icon: string }[]
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  return (
    <div className='w-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <SidebarMenuButton className='w-full' aria-label={`Select Project`}>
            <Icons.hexagon className='size-4 text-sub' />
            <span className={cn('truncate', !value && 'text-sub')}>
              {value
                ? projects.find((project) => project.value === value)?.label
                : 'Select project'}
            </span>
          </SidebarMenuButton>
        </PopoverTrigger>
        <PopoverContent
          className='w-full min-w-[var(--radix-popper-anchor-width)] p-0'
          align='start'
        >
          <Command>
            <CommandInput className='px-0' placeholder='Find project' />
            <CommandList>
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup>
                {projects.map((project) => {
                  const Icon = Icons[project.icon as keyof typeof Icons]
                  return (
                    <CommandItem
                      key={project.value}
                      value={project.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Icon className='size-4 mr-2 text-sub' />
                      {project.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          value === project.value ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <Button
                  variant='ghost'
                  className='w-full justify-start font-normal text-sub'
                >
                  <Icons.plus
                    className='-ms-2 me-2 size-4 text-sub'
                    aria-hidden='true'
                  />
                  New project
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
