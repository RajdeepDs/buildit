'use client'

import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@buildit/ui/breadcrumb'
import { Separator } from '@buildit/ui/separator'
import { SidebarTrigger } from '@buildit/ui/sidebar'
import { Skeleton } from '@buildit/ui/skeleton'

import { useNavigation } from '@/hooks/use-navigation'
import { api } from '@/lib/trpc/react'

/**
 * The header of the entire layout of the application.
 * @param props The props to the header.
 * @param props.children The children of the header.
 * @returns The header of the application.
 */
export default function Header({
  children,
}: {
  children?: React.ReactNode
}): JSX.Element {
  const pathname = usePathname()

  const teamId = useMemo(() => pathname.split('/')[2], [pathname])

  const { currentNavigation, isTeamPage } = useNavigation(pathname)

  // Fetch team data only if on a team page and teamId is available
  const { data: teamQuery, isLoading } = api.team.get_team_by_teamId.useQuery(
    { teamId: teamId! },
    { enabled: !!teamId && isTeamPage },
  )
  const teamName = teamQuery?.name ?? teamId

  const title = useMemo(() => currentNavigation?.name, [currentNavigation])

  return (
    <header className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <SidebarTrigger />
        <Separator orientation='vertical' className='h-5 mr-1' />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {isTeamPage ? (
                <>
                  {isLoading ? (
                    <Skeleton className='w-52 h-4' />
                  ) : (
                    <>
                      {teamQuery ? (
                        <>
                          <BreadcrumbItem>{teamName}</BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbPage>{title}</BreadcrumbPage>
                        </>
                      ) : (
                        <>
                          <BreadcrumbPage>Issue</BreadcrumbPage>
                          <BreadcrumbSeparator />
                          <BreadcrumbPage>{teamName}</BreadcrumbPage>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <BreadcrumbPage>{title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </header>
  )
}
