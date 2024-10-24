'use client'

import { useState } from 'react'

import { Badge } from '@buildit/ui/badge'
import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
import { Sidebar, SidebarContent, SidebarHeader } from '@buildit/ui/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@buildit/ui/tabs'

import IssueList from '@/components/issues/issue-list'
import Header from '@/components/layout/header'
import DisplayMenu from '@/components/ui/display-menu'
import FilterMenu from '@/components/ui/filter-menu'
import FloatingToolbar from '@/components/ui/floating-toolbar'
import { Icons } from '@/components/ui/icons'
import { useFilterStore, useFloatingToolbar } from '@/hooks/store'
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
            <IssueList allIssues={allIssues} />
          </div>
          {/* Sliding sidebar */}
          <div
            className={cn(
              'absolute top-0 right-0 h-full bg-white border rounded-md transition-all ease-in-out duration-300',
              sidebarOpen ? 'w-80 opacity-100' : 'w-0 opacity-0',
            )}
          >
            <Sidebar collapsible='none' className='w-full'>
              <SidebarHeader className='border-b'>
                <div className='flex items-center justify-between'>
                  <h1 className='font-medium text-sm'>My issues</h1>
                  <Badge>{allIssues?.length}</Badge>
                </div>
              </SidebarHeader>
              <SidebarContent
                className={cn(
                  'p-3 transition-opacity duration-300 ease-in-out overflow-hidden',
                  sidebarOpen ? 'opacity-100' : 'opacity-0',
                )}
              >
                <Tabs
                  defaultValue='labels'
                  className='flex flex-col gap-2 text-center '
                >
                  <TabsList className='p-0.5 w-full gap-2.5'>
                    <TabsTrigger value='labels'>Labels</TabsTrigger>
                    <TabsTrigger value='priority'>Priority</TabsTrigger>
                    <TabsTrigger value='projects'>Projects</TabsTrigger>
                    <TabsTrigger value='teams'>Teams</TabsTrigger>
                  </TabsList>
                  <TabsContent value='labels'>No Labels used</TabsContent>
                  <TabsContent value='priority'>No Prioriy used</TabsContent>
                  <TabsContent value='projects'>No Projects used</TabsContent>
                  <TabsContent value='teams'>No Teams used</TabsContent>
                </Tabs>
              </SidebarContent>
            </Sidebar>
          </div>
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
