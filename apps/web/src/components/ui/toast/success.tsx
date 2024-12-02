import { CircleCheck, X } from 'lucide-react'

import { Button } from '@buildit/ui/button'
import { sonner } from '@buildit/ui/sonner'

/**
 * A success notification.
 * @param props The props.
 * @param props.t The text.
 * @param props.message The message.
 * @returns The success notification component.
 */
export default function SuccessNotification({
  t,
  message,
}: {
  t: string | number
  message: string
}) {
  return (
    <div className='w-[var(--width)] rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5'>
      <div className='flex gap-2'>
        <p className='grow text-sm'>
          <CircleCheck
            className='-mt-0.5 me-3 inline-flex text-emerald-500'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
          {message}
        </p>
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
  )
}
