import type { ReactNode } from 'react'

import { Label } from '@buildit/ui/label'

interface SubHeaderProps {
  title: string
  description: string
  children: ReactNode
}

/**
 * SubHeader component for settings page
 * @param props The props object.
 * @param props.title The title of the subheader.
 * @param props.description The description of the subheader.
 * @param props.children The children of the subheader.
 * @returns The subheader component.
 */
export default function SubHeader({
  title,
  description,
  children,
}: SubHeaderProps): JSX.Element {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col items-start gap-1'>
        <Label className='font-normal'>{title}</Label>
        <span className='text-xs font-light text-sub'>{description}</span>
      </div>
      {children}
    </div>
  )
}
