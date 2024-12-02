import { CircleCheck, X } from 'lucide-react'

import { Button } from '@buildit/ui/button'
import { sonner } from '@buildit/ui/sonner'

/**
 * An error notification.
 * @param props The props.
 * @param props.t The text.
 * @returns JSX.Element
 */
export default function ErrorNotification({
  t,
}: {
  t: string | number
}): JSX.Element {
  return (
    <div className='w-[var(--width)] rounded-lg border border-soft bg-white px-4 py-3'>
      <div className='flex gap-2'>
        <p className='grow text-sm'>
          <CircleCheck
            className='-mt-0.5 me-3 inline-flex text-red-500'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
          An error occurred!
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
