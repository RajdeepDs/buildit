import type { Metadata } from 'next'

import ProjectsClientPage from './page-client'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'View and manage your projects.',
}

/**
 * The Projects page. This is the where all the projects shown.
 * @returns Next.js RSC page.
 */
export default function ProjectPage(): JSX.Element {
  return (
    <div className='h-full w-full'>
      <ProjectsClientPage />
    </div>
  )
}
