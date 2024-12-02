'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
import { Separator } from '@buildit/ui/separator'
import { sonner } from '@buildit/ui/sonner'

import Header from '@/components/layout/header'
import SlidingSidebar from '@/components/layout/sliding-sidebar'
import SlidingSidebarTabs from '@/components/layout/sliding-sidebar-tabs'
import TabContentItem from '@/components/layout/tab-content-item'
import { NewProjectModal } from '@/components/modals/new-project-modal'
import ProjectLists from '@/components/projects/project-lists'
import DisplayMenu from '@/components/ui/display-menu'
import FilterMenu from '@/components/ui/filter/filter-menu'
import FloatingToolbar from '@/components/ui/floating-toolbar'
import { Icons } from '@/components/ui/icons'
import ErrorNotification from '@/components/ui/toast/error'
import {
  ProjectsDisplayProperties,
  ProjectsGroupingOptions,
} from '@/configs/display-settings'
import { useProjects } from '@/hooks/data/use-projects'
import { useTeams } from '@/hooks/data/use-teams'
import { useUser } from '@/hooks/data/use-user'
import { useProjectFilter } from '@/hooks/filters/use-project-filter'
import { useFilterStore } from '@/hooks/store'
import { useLeadsSummary } from '@/hooks/use-lead-summary'
import { usePrioritySummary } from '@/hooks/use-priority-summary'
import { useStatusSummary } from '@/hooks/use-status-summary'
import { useTeamsSummary } from '@/hooks/use-teams-summary'

/**
 * The Projects client page.
 * @returns Next.js RSC page.
 */
export default function ProjectsClientPage(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { and, selectedItems } = useFilterStore()

  const { data: allProjects, isLoading, isError } = useProjects()
  const { data: allTeams } = useTeams()
  const { data: user } = useUser()

  const { statuses, statusCount } = useStatusSummary(allProjects)
  const { priorities, priorityCount } = usePrioritySummary(allProjects)
  const { teams, teamCount } = useTeamsSummary(allProjects)
  const { uniqueLeads, leadCount } = useLeadsSummary(allProjects)

  const { filterOptions } = useProjectFilter(allProjects)

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

  const leadNamesWithCount = useMemo(() => {
    if (!user) return []
    return uniqueLeads.map((lead) => ({
      name: lead === user.id ? user.name : lead,
      image: lead === user.id ? user.image : null, // Include image
      count: leadCount[lead] ?? 0,
    }))
  }, [uniqueLeads, leadCount, user])

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
      {
        label: 'Leads',
        content: (
          <TabContentItem
            label='Leads'
            items={leadNamesWithCount.map(({ name, image }) => ({
              name,
              image,
            }))}
            itemCount={Object.fromEntries(
              leadNamesWithCount.map(({ name, count }) => [name, count]),
            )}
          />
        ),
      },
      {
        label: 'Teams',
        content: (
          <TabContentItem
            label='Teams'
            items={teamNamesWithCount?.map(({ name }) => name) ?? []}
            itemCount={Object.fromEntries(
              teamNamesWithCount?.map(({ name, count }) => [name, count]) ?? [],
            )}
          />
        ),
      },
    ],
    [
      statuses,
      statusCount,
      priorities,
      priorityCount,
      leadNamesWithCount,
      teamNamesWithCount,
    ],
  )

  useEffect(() => {
    if (isError) {
      sonner.custom((t) => <ErrorNotification t={t} />)
    }
  }, [isError])

  return (
    <div className='h-full flex flex-col gap-2 p-2'>
      <Header>
        <div className='flex items-center gap-2'>
          <NewProjectModal>
            <Button variant='secondary' size='sm' className='h-7'>
              <Icons.plus className='size-4 text-sub mr-1' />
              Create project
            </Button>
          </NewProjectModal>
          <Separator orientation='vertical' className='h-5 ml-1' />
          <Button
            variant='ghost'
            size='icon'
            className='size-7'
            onClick={() => {
              setSidebarOpen(!sidebarOpen)
            }}
          >
            <Icons.panelRight className='size-4 text-sub' />
          </Button>
        </div>
      </Header>
      <div className='flex justify-between items-center'>
        <FilterMenu filters={filterOptions} />
        <DisplayMenu
          groupingOptions={ProjectsGroupingOptions}
          allDisplayProperties={ProjectsDisplayProperties}
        />
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
                    index === 0 && 'rounded-t-lg border-t',
                    index === 9 ? 'rounded-b-lg border-b mb-2' : 'border-b',
                  )}
                  role='listitem'
                />
              ))}
            </>
          ) : (
            <ProjectLists projects={allProjects} />
          )}
        </div>
        <SlidingSidebar
          label='Projects'
          sidebarOpen={sidebarOpen}
          issuesCount={allProjects?.length}
        >
          <SlidingSidebarTabs tabsData={tabsData} />
        </SlidingSidebar>
      </div>
      <div
        className={cn(
          'fixed bottom-4 inset-x-0 justify-center transition-all overflow-hidden',
          and.length > 0 || selectedItems.length > 0
            ? 'flex opacity-100 translate-y-0 h-auto py-3 duration-300'
            : 'flex opacity-0 translate-y-full h-0 pointer-events-none duration-150',
        )}
      >
        <FloatingToolbar filters={and} selectedItems={selectedItems} />
      </div>
    </div>
  )
}
