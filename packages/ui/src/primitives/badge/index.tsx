import * as React from 'react'

import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-weak text-strong hover:bg-primary-9',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-9',
        destructive:
          'border-transparent bg-error-lighter text-error hover:bg-error-light/60',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * A badge is a small status descriptor for UI elements.
 * @param props The badge props.
 * @param props.className The className to apply to the badge.
 * @param props.variant The variant of the badge.
 * @returns The badge component.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
