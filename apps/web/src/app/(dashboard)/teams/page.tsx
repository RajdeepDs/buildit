import type { Metadata } from 'next'

import TeamsClientPage from './page-client'

export const metadata: Metadata = {
  title: 'Teams',
  description: 'View and manage your teams.',
}

/**
 * The Teams page. This is the where all the Teams shown.
 * @returns Next.js RSC page.
 */
export default function TeamPage(): JSX.Element {
  return (
    <div className='h-full w-full'>
      <TeamsClientPage />
    </div>
  )
}
