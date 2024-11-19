'use client'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
import { toast } from '@buildit/ui/toast'

import Header from '@/components/layout/header'
import TeamList from '@/components/teams/team-list'
import DisplayMenu from '@/components/ui/display-menu'
import EmptyState from '@/components/ui/empty-state'
import { Icons } from '@/components/ui/icons'
import { TeamsDisplayProperties } from '@/configs/display-settings'
import { api } from '@/lib/trpc/react'

/**
 * The Teams client page.
 * @returns Next.js RSC page.
 */
export default function TeamsClientPage(): JSX.Element {
  const { data: allTeams, isLoading, error } = api.team.get_teams.useQuery()

  if (allTeams?.length === 0) {
    return <EmptyState id='teams' />
  }

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch teams',
      variant: 'destructive',
    })
  }
  return (
    <>
      <div className='h-full flex flex-col gap-2'>
        <Header>
          <div className='flex items-center gap-2'>
            {/* TODO: Add new team modal to create a new team */}
            <Button variant={'secondary'} size={'sm'} className='h-7'>
              <Icons.plus className='size-4 text-sub mr-1' />
              Add team
            </Button>
          </div>
        </Header>
        <div className='flex justify-end items-center'>
          {/* TODO: Add Filter menu  */}
          <DisplayMenu allDisplayProperties={TeamsDisplayProperties} />
        </div>
        <div className='h-full w-full'>
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center border-x p-3 bg-weak/50 animate-pulse h-12',
                    index === 0 && 'rounded-t-lg border-t',
                    index === 9 ? 'rounded-b-lg border-b mb-2' : 'border-b',
                  )}
                  role='listitem'
                />
              ))}
            </>
          ) : (
            <TeamList teams={allTeams} />
          )}
        </div>
      </div>
    </>
  )
}
