'use client'

import { useEffect } from 'react'

import { Button } from '@buildit/ui/button'
import { cn } from '@buildit/ui/cn'
import { sonner } from '@buildit/ui/sonner'

import Header from '@/components/layout/header'
import { NewTeamModal } from '@/components/modals/new-team-modal'
import TeamList from '@/components/teams/team-list'
import DisplayMenu from '@/components/ui/display-menu'
import EmptyState from '@/components/ui/empty-state'
import { Icons } from '@/components/ui/icons'
import ErrorNotification from '@/components/ui/toast/error'
import { TeamsDisplayProperties } from '@/configs/display-settings'
import { useTeams } from '@/hooks/data/use-teams'

/**
 * The Teams client page.
 * @returns Next.js RSC page.
 */
export default function TeamsClientPage(): JSX.Element {
  const { data: allTeams, isLoading, isError } = useTeams()

  useEffect(() => {
    if (isError) {
      sonner.custom((t) => <ErrorNotification t={t} />)
    }
  }, [isError])

  if (allTeams?.length === 0) {
    return <EmptyState id='teams' />
  }

  return (
    <>
      <div className='h-full flex flex-col gap-2 p-2'>
        <Header>
          <div className='flex items-center gap-2'>
            <NewTeamModal>
              <Button variant='secondary' size='sm' className='h-7'>
                <Icons.plus className='size-4 text-sub mr-1' />
                Create team
              </Button>
            </NewTeamModal>
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
