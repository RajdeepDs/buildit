'use client'

import { useState } from 'react'

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
import { api } from '@/lib/trpc/react'

/**
 * The My Issues client page.
 * @returns Next.js RSC page.
 */
export default function MyIssuesClientPage(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { isOpen } = useFloatingToolbar()
  const { and } = useFilterStore()

  const { data: allIssues, isLoading, error } = api.issues.get_issues.useQuery()

  const { statuses, statusCount } = useStatusSummary(allIssues)
  const { priorities, priorityCount } = usePrioritySummary(allIssues)

  if (isLoading) {
    return <div>Loading issues...</div>
  }

  if (error) {
    return <div className='text-red-600'>Error: {error.message}</div>
  }

  const tabsData = [
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
    { label: 'Teams', content: 'No Teams used' },
  ]

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
            <IssueList allIssues={allIssues} />
          </div>
          {/* Sliding sidebar */}
          <SlidingSidebar
            sidebarOpen={sidebarOpen}
            issuesCount={allIssues?.length}
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
