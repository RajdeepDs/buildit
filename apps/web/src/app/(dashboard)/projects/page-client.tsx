'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@buildit/ui/breadcrumb'
import { Button } from '@buildit/ui/button'

import { NewProjectModal } from '@/components/modals/new-project-modal'
import ProjectLists from '@/components/projects/project-lists'
import { Icons } from '@/components/ui/icons'

/**
 * The Projects client page.
 * @returns Next.js RSC page.
 */
export default function ProjectsClientPage(): JSX.Element {
  return (
    <div className='space-y-3'>
      <nav className='flex items-center justify-between space-x-2 px-3'>
        <header className='p-2'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Icons.home className='h-4 w-4 text-sub' />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <NewProjectModal>
          <Button size={'sm'}>
            <Icons.plus className='h-4 w-4 mr-2 text-white' />
            New project
          </Button>
        </NewProjectModal>
      </nav>
      <main className='h-svh w-full border-t'>
        <ProjectLists />
      </main>
    </div>
  )
}
