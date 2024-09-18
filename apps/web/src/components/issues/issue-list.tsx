'use client'

import type { Store } from '@/lib/store/my-issues-store'

/**
 * The Issue list component to display a list of issues. And empty state for Issues Page
 * @param props The component properties.
 * @param props.store The store to use.
 * @returns React component.
 */
export default function IssueList({ store }: { store: Store }): JSX.Element {
  return (
    <div className='h-full'>
      <div className='flex h-1/2 w-full flex-col items-center justify-center space-y-4 rounded-lg'>
        <div className='flex flex-col items-center'>
          <h1 className='font-cal text-strong text-xl'>No issues found</h1>
          <p className='text-sm text-sub'>
            There aren&apos;t any issues at the moment. Create one to get
            started!{' '}
          </p>
        </div>
      </div>
    </div>
  )
}
