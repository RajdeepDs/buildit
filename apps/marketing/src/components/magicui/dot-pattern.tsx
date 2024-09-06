import { useId } from 'react'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface DotPatternProps {
  width?: any
  height?: any
  x?: any
  y?: any
  cx?: any
  cy?: any
  cr?: any
  className?: string
  [key: string]: any
  children?: ReactNode
}
/**
 * DotPattern
 * @param props
 * @param props.width
 * @param props.height
 * @param props.x
 * @param props.y
 * @param props.cx
 * @param props.cy
 * @param props.cr
 * @param props.className
 * @param props.children
 * @returns JSX.Element
 */
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 2,
  cy = 2,
  cr = 1,
  className,
  children,
  ...props
}: DotPatternProps) {
  const id = useId()

  return (
    <>
      <div className='-z-50 fixed top-0 left-0'>
        <div className='sticky top-0 left-0 h-screen w-screen overflow-hidden'>
          <svg
            aria-hidden='true'
            className={cn(
              'pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80',
              className,
            )}
            {...props}
          >
            <defs>
              <pattern
                id={id}
                width={width}
                height={height}
                patternUnits='userSpaceOnUse'
                patternContentUnits='userSpaceOnUse'
                x={x}
                y={y}
              >
                <circle id='pattern-circle' cx={cx} cy={cy} r={cr} />
              </pattern>
            </defs>
            <rect
              width='100%'
              height='100%'
              strokeWidth={0}
              fill={`url(#${id})`}
            />
          </svg>
        </div>
      </div>
      {children}
    </>
  )
}

export default DotPattern
