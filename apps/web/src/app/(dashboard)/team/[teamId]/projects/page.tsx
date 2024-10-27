import type { Metadata } from 'next'

import TeamProjectsClientPage from './page-client'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'View and manage your projects.',
}

/**
 * The Team Projects page. This is the where all the projects shown created by a particular team.
 * @returns Next.js RSC page.
 */
export default function TeamProjectPage(): JSX.Element {
  return (
    <div className='h-full w-full'>
      <TeamProjectsClientPage />
    </div>
  )
}
