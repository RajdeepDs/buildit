import * as React from 'react'

import type { VariantProps } from 'class-variance-authority'

import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-strong hover:bg-surface focus:ring-sub disabled:bg-soft text-white focus:ring-2 focus:ring-offset-1 focus-visible:outline-none',
        destructive:
          'bg-default text-strong border-default hover:bg-error focus:bg-error focus:ring-offset border hover:border-red-100 hover:text-error-lighter focus:border-red-100 focus:text-error-lighter focus:ring-2 focus:ring-red-700 focus-visible:outline-none disabled:border-red-200 disabled:bg-red-100 disabled:text-red-700 disabled:hover:border-red-200',
        secondary:
          'bg-white text-strong border-soft hover:bg-weak focus:ring-soft focus:ring-offset-1 disabled:bg-soft disabled:text-soft disabled:hover:border-soft border focus:ring-2 focus-visible:outline-none',
        ghost:
          'text-soft  hover:bg-weak focus-visible:ring-offset focus-visible:ring-emphasis disabled:hover:bg-disabled disabled:text-disabled focus-visible:outline-none focus-visible:ring-2',
        link: 'text-strong underline-offset-4 hover:underline ',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
