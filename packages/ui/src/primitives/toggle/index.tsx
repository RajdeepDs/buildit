'use client'

import * as React from 'react'

import type { VariantProps } from 'class-variance-authority'

import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-weak hover:text-strong focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-soft disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-weak data-[state=on]:text-strong',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-soft bg-transparent shadow-sm hover:bg-weak hover:text-strong',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
