'use client'

import Link from 'next/link'

import { CircleCheck, X } from 'lucide-react'

import { Button } from '@buildit/ui/button'
import { sonner } from '@buildit/ui/sonner'

interface CreateIssueNotificationProps {
  t: string | number
  message: string
  issueId: string
  title: string
}

/**
 * A notification for creating an issue.
 * @param props The props.
 * @param props.t the toast.
 * @param props.message The message.
 * @param props.issueId The issue ID.
 * @param props.title The title.
 * @returns JSX.Element
 */
export default function CreateIssueNotification({
  t,
  message,
  issueId,
  title,
}: CreateIssueNotificationProps) {
  return (
    <div className='w-[var(--width)] rounded-lg border border-soft bg-white p-4 shadow-lg shadow-black/5'>
      <div className='flex gap-2'>
        <div className='flex grow gap-3'>
          <CircleCheck
            className='mt-0.5 shrink-0 text-emerald-500'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
          <div className='flex grow flex-col gap-3'>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-strong'>{message}</p>
              <p className='text-sm text-sub'>
                <span className='tabular-nums font-medium '>{issueId}</span>{' '}
                {title}
              </p>
            </div>
            <Button
              size={'sm'}
              variant={'secondary'}
              className='h-7 w-fit'
              onClick={() => {
                sonner.dismiss(t)
              }}
              asChild
            >
              <Link href={`/issue/${issueId}`}>View issue</Link>
            </Button>
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
