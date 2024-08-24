import React from 'react'

import { cn, withRef } from '@udecode/cn'
import { PlateLeaf } from '@udecode/plate-common'

export const HighlightLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => (
    <PlateLeaf
      asChild
      className={cn(
        'bg-slate-900/20 text-inherit dark:bg-slate-900/40 dark:bg-slate-50/20 dark:dark:bg-slate-50/40',
        className,
      )}
      ref={ref}
      {...props}
    >
      <mark>{children}</mark>
    </PlateLeaf>
  ),
)
