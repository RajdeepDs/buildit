'use client'

import { cn, withRef } from '@udecode/cn'
import { PlateLeaf } from '@udecode/plate-common/react'

export const CodeLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateLeaf
        asChild
        className={cn(
          'whitespace-pre-wrap rounded bg-soft px-1 py-0.5 font-mono text-sm dark:bg-slate-800',
          className,
        )}
        ref={ref}
        {...props}
      >
        <code>{children}</code>
      </PlateLeaf>
    )
  },
)
