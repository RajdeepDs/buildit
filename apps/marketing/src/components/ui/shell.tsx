import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * The Shell component
 * @param props The props object
 * @param props.className The class name to apply
 * @param props.children The children to render
 * @returns JSX.Element
 */
export default function Shell({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'w-full rounded-lg border px-3 py-4 backdrop-blur-[2px] md:p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
