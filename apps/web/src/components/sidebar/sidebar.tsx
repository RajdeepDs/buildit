'use client'

import { usePathname } from 'next/navigation'

import DashboardSidebar from '@/components/sidebar/dashboard-sidebar'
import { api } from '@/lib/trpc/react'

import SettingsSidebar from './settings-sidebar'

/**
 * The sidebar component. This is where we will have the sidebar of the application.
 * @returns The sidebar component.
 */
export default function Sidebar(): JSX.Element {
  const pathname = usePathname()

  const [{ data: user }, { data: workspace }, { data: teams }] = api.useQueries(
    (query) => [
      query.user.get_user(),
      query.workspace.get_workspace(),
      query.team.get_teams(),
    ],
  )

  if (!user || !workspace || !teams) {
    return <></>
  }

  return (
    <aside className='w-[240px] bg-weak'>
      {!pathname.startsWith(`/settings`) ? (
        <DashboardSidebar user={user} workspace={workspace} teams={teams} />
      ) : (
        <SettingsSidebar user={user} teams={teams} />
      )}
    </aside>
  )
}
