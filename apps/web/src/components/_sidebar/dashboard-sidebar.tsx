import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { TTeam, TUser, TWorkspace } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'

import AvatarDropdownMenu from '@/components/sidebar/avatar-dropdown-menu'
import { Icons } from '@/components/ui/icons'
import VerticalTabs from '@/components/ui/vertical-tabs'
import {
  getNavigations,
  getTeamsNavigations,
} from '@/configs/sidebar-navigations'

interface DashboardSidebarProps {
  user: Pick<TUser, 'id' | 'name' | 'image'>
  teams: Pick<TTeam, 'id' | 'name' | 'teamId'>[]
  workspace: Pick<TWorkspace, 'name'>
}

/**
 * The dashboard sidebar component. This is where we will have the sidebar of the dashboard pages.
 * @param props - The props object.
 * @param props.user - The user.
 * @param props.teams - The teams.
 * @param props.workspace - The workspace.
 * @returns The dashboard sidebar component.
 */
export default function DashboardSidebar({
  user,
  teams,
  workspace,
}: DashboardSidebarProps): JSX.Element {
  const pathname = usePathname()

  const Navigations = getNavigations()

  return (
    <div className='flex h-full flex-col space-y-3 p-3'>
      <div className='flex items-center gap-x-2 p-2'>
        {user.image && (
          <Avatar className='size-5'>
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        )}
        <AvatarDropdownMenu workspace={workspace} />
      </div>
      {/* <div className='flex items-center justify-between '>
        <CreateIssueModal>
          <Button StartIcon='plus' size={'sm'}>
            New issue
          </Button>
        </CreateIssueModal>
        <Button size={'icon'} color='secondary' className='hidden bg-white'>
          <Icons.search className='h-4 w-4 text-soft' />
        </Button>
      </div> */}
      <div className='flex-1 space-y-4'>
        <p className='p-2 font-medium text-sm text-sub'>Home</p>
        {Navigations.map(({ name, href, icon }) => {
          return (
            <Link key={name} href={href}>
              <VerticalTabs
                name={name}
                href={href}
                pathname={pathname}
                icon={icon}
              />
            </Link>
          )
        })}
        <div>
          <p className='p-2 font-medium text-sm text-sub'>Your teams</p>
          {teams.map((team) => {
            const teamNavigations = getTeamsNavigations(team.teamId)
            return (
              <div className='mb-4' key={team.id}>
                <div className='flex items-center gap-x-2 px-2 py-1.5'>
                  <div className='w-fit items-center rounded-sm'>
                    <Icons.home className='h-4 w-4 text-sub' />
                  </div>
                  <span className='font-medium text-sm text-sub'>
                    {team.name}
                  </span>
                </div>
                <div className='ml-6'>
                  {teamNavigations.map(({ name, href, icon }) => (
                    <Link key={name} href={href}>
                      <VerticalTabs
                        name={name}
                        href={href}
                        pathname={pathname}
                        icon={icon}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
