'use client'

import { useState } from 'react'

import { Badge } from '@buildit/ui/badge'
import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
import { Separator } from '@buildit/ui/separator'
import { Sidebar, SidebarContent, SidebarHeader } from '@buildit/ui/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@buildit/ui/tabs'

import Header from '@/components/layout/header'
import FilterMenu from '@/components/projects/filter-menu'
import ProjectLists from '@/components/projects/project-lists'
import DisplayMenu from '@/components/ui/display-menu'
import { Icons } from '@/components/ui/icons'

/**
 * The Team Projects client page.
 * @returns Next.js RSC page.
 */
export default function TeamProjectsClientPage(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // TODO: Implement filters functionality for projects

  return (
    <>
      <div className='h-full flex flex-col gap-2'>
        <Header>
          <div className='flex items-center gap-2'>
            {/* TODO: Add a Create Project modal to create project */}
            <Button variant={'secondary'} size={'sm'} className='h-7'>
              <Icons.plus className='size-4 text-sub mr-1' />
              Create project
            </Button>
            <Separator orientation='vertical' className='h-5 ml-1' />
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
          </div>
        </Header>
        <div className='flex justify-between items-center'>
          <FilterMenu />
          {/* TODO: Add a new display menu for projects */}
          <DisplayMenu />
        </div>
        <div className='relative flex h-full w-full overflow-hidden'>
          <div
            className={cn(
              'flex-1 transition-all ease-in-out duration-300',
              sidebarOpen ? 'pr-80 mr-2' : 'pr-0',
            )}
          >
            <ProjectLists />
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
                  <h1 className='font-medium text-sm'>Projects</h1>
                  {/* TODO: Add number of projects */}
                  <Badge>{0}</Badge>
                </div>
              </SidebarHeader>
              <SidebarContent
                className={cn(
                  'p-3 transition-opacity duration-300 ease-in-out overflow-hidden',
                  sidebarOpen ? 'opacity-100' : 'opacity-0',
                )}
              >
                <Tabs
                  defaultValue='status'
                  className='flex flex-col gap-2 text-center '
                >
                  <TabsList className='p-0.5 w-full gap-3.5'>
                    <TabsTrigger value='status'>Status</TabsTrigger>
                    <TabsTrigger value='priority'>Priority</TabsTrigger>
                    <TabsTrigger value='leads'>Leads</TabsTrigger>
                    <TabsTrigger value='teams'>Teams</TabsTrigger>
                  </TabsList>
                  {/* Todo: Add functionality for all of these*/}
                  <TabsContent value='status'>No Status used</TabsContent>
                  <TabsContent value='priority'>No Priority used</TabsContent>
                  <TabsContent value='leads'>No Leads used</TabsContent>
                  <TabsContent value='teams'>No Teams used</TabsContent>
                </Tabs>
              </SidebarContent>
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  )
}
