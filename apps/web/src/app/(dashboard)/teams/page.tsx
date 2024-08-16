import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@buildit/ui/breadcrumb'

import { NewTeamModal } from '@/components/modals/new-team-modal'
import TeamList from '@/components/teams/team-list'
import { Icons } from '@/components/ui/icons'

/**
 * The Teams page. This is the where all the teams shown.
 * @returns Next.js RSC page.
 */
export default function TeamsPage(): JSX.Element {
  return (
    <div className='h-full w-full space-y-3 py-3'>
      <nav className='flex items-center justify-between space-x-2 px-3'>
        <header className='p-2'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Icons.home className='h-4 w-4 text-sub' />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Teams</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {/* New Team Modal */}
        <NewTeamModal />
      </nav>
      <main className='h-svh w-full border-t'>
        <TeamList />
      </main>
    </div>
  )
}
