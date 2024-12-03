import { CircleCheck, X } from 'lucide-react'

import { Button } from '@buildit/ui/button'
import { sonner } from '@buildit/ui/sonner'

/**
 * A success notification for settings.
 * @param props The props.
 * @param props.t The text.
 * @param props.title The title.
 * @param props.description The description.
 * @returns The settings success notification component.
 */
export default function SettingsSuccessNotification({
  t,
  title,
  description,
}: {
  t: string | number
  title: string
  description: string
}) {
  return (
    <div className='w-[var(--width)] rounded-lg border border-soft bg-white p-4 shadow-lg shadow-black/5'>
      <div className='flex gap-2'>
        <div className='flex grow gap-3'>
          <CircleCheck
            className='mt-0.5 shrink-0 text-success'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
          <div className='flex grow flex-col gap-3'>
            <div className='space-y-1'>
              <p className='text-sm font-medium'>{title}</p>
              <p className='text-sm text-sub'>{description}</p>
            </div>
          </div>
          <Button
            variant='ghost'
            className='group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent'
            aria-label='Close notification'
            onClick={() => {
              sonner.dismiss(t)
            }}
          >
            <X
              size={16}
              strokeWidth={2}
              className='opacity-60 transition-opacity group-hover:opacity-100'
              aria-hidden='true'
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
