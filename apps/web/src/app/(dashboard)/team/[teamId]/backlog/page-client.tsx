'use client'

import { useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'

import IssueList from '@/components/issues/issue-list'
import Header from '@/components/layout/header'
import SlidingSidebar from '@/components/layout/sliding-sidebar'
import SlidingSidebarTabs from '@/components/layout/sliding-sidebar-tabs'
import TabContentItem from '@/components/layout/tab-content-item'
import DisplayMenu from '@/components/ui/display-menu'
import FilterMenu from '@/components/ui/filter-menu'
import FloatingToolbar from '@/components/ui/floating-toolbar'
import { Icons } from '@/components/ui/icons'
import { useFilterStore, useFloatingToolbar } from '@/hooks/store'
import { usePrioritySummary } from '@/hooks/use-priority-summary'
import { useStatusSummary } from '@/hooks/use-status-summary'
import { useTeamsSummary } from '@/hooks/use-teams-summary'
import { api } from '@/lib/trpc/react'

/**
 * The Backlog issues client page.
 * @returns Next.js RSC page.
 */
export default function BacklogIssuesClientPage(): JSX.Element {
  const pathname = usePathname()

  const teamId = useMemo(() => pathname.split('/')[2], [pathname]) ?? ''

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { isOpen } = useFloatingToolbar()
  const { and } = useFilterStore()

  const {
    data: allIssues,
    isLoading,
    error,
  } = api.issues.get_issues_by_team.useQuery({ teamId: teamId })

  const issues = allIssues?.filter((issue) => issue.status === 'backlog')

  const { statuses, statusCount } = useStatusSummary(issues)
  const { priorities, priorityCount } = usePrioritySummary(issues)
  const { teams, teamCount } = useTeamsSummary(issues)

  const { data: allTeams } = api.team.get_teams.useQuery()

  const teamNamesWithCount = useMemo(
    () =>
      allTeams
        ?.filter((team) => teams.includes(team.id))
        .map((team) => ({
          name: team.name,
          count: teamCount[team.id] ?? 0,
        })),
    [allTeams, teams, teamCount],
  )

  const tabsData = useMemo(
    () => [
      {
        label: 'Status',
        content: (
          <TabContentItem
            label='Status'
            items={statuses}
            itemCount={statusCount}
          />
        ),
      },
      {
        label: 'Priority',
        content: (
          <TabContentItem
            label='Priority'
            items={priorities}
            itemCount={priorityCount}
          />
        ),
      },
      { label: 'Projects', content: 'No Projects used' },
      {
        label: 'Teams',
        content: (
          <TabContentItem
            label='Teams'
            items={teamNamesWithCount?.map((team) => team.name) ?? []}
            itemCount={Object.fromEntries(
              teamNamesWithCount?.map(({ name, count }) => [name, count]) ?? [],
            )}
          />
        ),
      },
    ],
    [statuses, statusCount, priorities, priorityCount, teamNamesWithCount],
  )

  if (isLoading) {
    return <div>Loading issues...</div>
  }

  if (error) {
    return <div className='text-red-600'>Error: {error.message}</div>
  }

  return (
    <>
      <div className='h-full flex flex-col gap-2'>
        <Header>
          <Button
            variant={'ghost'}
            size={'icon'}
            className='size-7'
            onClick={() => {
              setSidebarOpen(!sidebarOpen)
            }}
          >
            <Icons.panelRight className='size-4 text-sub' />
          </Button>
        </Header>
        <div className='flex justify-between items-center'>
          <FilterMenu />
          <DisplayMenu />
        </div>
        <div className='relative flex h-full w-full overflow-hidden'>
          <div
            className={cn(
              'flex-1 transition-all ease-in-out duration-300',
              sidebarOpen ? 'pr-80 mr-2' : 'pr-0',
            )}
          >
            <IssueList allIssues={issues} />
          </div>
          {/* Sliding sidebar */}
          <SlidingSidebar
            label='Active issues'
            sidebarOpen={sidebarOpen}
            issuesCount={issues?.length}
          >
            <SlidingSidebarTabs tabsData={tabsData} />
          </SlidingSidebar>
        </div>
        <div
          className={cn(
            'absolute bottom-5 w-full justify-center transition-all duration-300 overflow-hidden',
            isOpen || and.length > 0
              ? 'flex opacity-100 translate-y-0 h-auto'
              : 'flex opacity-0 translate-y-full h-0 pointer-events-none',
          )}
        >
          <FloatingToolbar filters={and} />
        </div>
      </div>
    </>
  )
}
