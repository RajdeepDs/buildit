'use client'

import React from 'react'

import { Command } from 'cmdk'

import { cn } from '@buildit/ui/cn'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'

export const ComboBox = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {children}
    </Popover>
  )
}

export const ComboBoxTrigger = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string | undefined
}) => {
  return (
    <PopoverTrigger asChild>
      <button
        className={cn(
          'rounded border flex items-center px-3 py-0.5 text-sm transition-colors duration-200 ease-in-out',
          className,
        )}
      >
        {children}
      </button>
    </PopoverTrigger>
  )
}

export const ComboBoxContent = ({
  children,
  className,
  placeholder,
}: {
  children: React.ReactNode
  className?: string | undefined
  placeholder?: string
}) => {
  return (
    <PopoverContent
      className={cn(className, 'p-0 min-w-[200px] w-0 max-w-[300px]:')}
      sideOffset={5}
      align='start'
    >
      <Command>
        <div className='flex items-center justify-start space-x-2 border-b p-2'>
          <Command.Input
            placeholder={placeholder ? placeholder : 'Search...'}
            className='w-full text-sm outline-none border-none focus:ring-0 p-0'
          />
        </div>
        <Command.List className='p-1'>
          <Command.Empty className='text-sm'>No results found!</Command.Empty>
          {children}
        </Command.List>
      </Command>
    </PopoverContent>
  )
}

export const ComboBoxItem = React.forwardRef<
  React.ElementRef<typeof Command.Item>,
  React.ComponentPropsWithoutRef<typeof Command.Item>
>(({ className, ...props }, ref) => (
  <Command.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50',
      className,
    )}
    {...props}
  />
))
ComboBoxItem.displayName = Command.Item.displayName
