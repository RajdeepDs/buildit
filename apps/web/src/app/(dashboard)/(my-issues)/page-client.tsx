'use client'

import { useMemo, useState } from 'react'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
import { Separator } from '@buildit/ui/separator'
import { toast } from '@buildit/ui/toast'

import IssueList from '@/components/issues/issue-list'
import Header from '@/components/layout/header'
import SlidingSidebar from '@/components/layout/sliding-sidebar'
import SlidingSidebarTabs from '@/components/layout/sliding-sidebar-tabs'
import TabContentItem from '@/components/layout/tab-content-item'
import { NewIssueModal } from '@/components/modals/new-issue-modal'
import DisplayMenu from '@/components/ui/display-menu'
import FilterMenu from '@/components/ui/filter-menu'
import FloatingToolbar from '@/components/ui/floating-toolbar'
import { Icons } from '@/components/ui/icons'
import { useFilterStore } from '@/hooks/store'
import { usePrioritySummary } from '@/hooks/use-priority-summary'
import { useStatusSummary } from '@/hooks/use-status-summary'
import { useTeamsSummary } from '@/hooks/use-teams-summary'
import { api } from '@/lib/trpc/react'

/**
 * The My Issues client page.
 * @returns Next.js RSC page.
 */
export default function MyIssuesClientPage(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { and, selectedIssues } = useFilterStore()

  const { data: allIssues, isLoading, error } = api.issues.get_issues.useQuery()

  const { statuses, statusCount } = useStatusSummary(allIssues)
  const { priorities, priorityCount } = usePrioritySummary(allIssues)
  const { teams, teamCount } = useTeamsSummary(allIssues)

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

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch issues',
      variant: 'destructive',
    })
  }

  return (
    <div className='h-full flex flex-col gap-2'>
      <Header>
        <div className='flex items-center gap-2'>
          <NewIssueModal>
            <Button
              size='sm'
              variant='secondary'
              className='text-sub h-7'
              aria-label='Create new issue'
            >
              <Icons.plus className='size-4 mr-1 text-sub' />
              Create Issue
            </Button>
          </NewIssueModal>
          <Separator orientation='vertical' className='h-5 ml-1' />
          <Button
            variant={'ghost'}
            size={'icon'}
            className='size-7'
            onClick={() => {
              setSidebarOpen((prev) => !prev)
            }}
          >
            <Icons.panelRight className='size-4 text-sub' />
          </Button>
        </div>
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
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center border-x p-3 bg-weak/50 animate-pulse h-11',
                    index == 0 && 'rounded-t-lg border-t',
                    index == 9 ? 'rounded-b-lg border-b mb-2' : 'border-b',
                  )}
                  role='listitem'
                />
              ))}
            </>
          ) : (
            <IssueList allIssues={allIssues} />
          )}
        </div>
        {/* Sliding sidebar */}
        <SlidingSidebar
          label='My issues'
          sidebarOpen={sidebarOpen}
          issuesCount={allIssues?.length}
        >
          <SlidingSidebarTabs tabsData={tabsData} />
        </SlidingSidebar>
      </div>
      <div
        className={cn(
          'fixed bottom-4 inset-x-0 justify-center transition-all overflow-hidden',
          and.length > 0 || selectedIssues.length > 0
            ? 'flex opacity-100 translate-y-0 h-auto py-3 duration-300'
            : 'flex opacity-0 translate-y-full h-0 pointer-events-none duration-150',
        )}
      >
        <FloatingToolbar filters={and} selectedIssues={selectedIssues} />
      </div>
    </div>
  )
}
