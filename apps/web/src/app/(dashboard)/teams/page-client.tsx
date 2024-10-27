'use client'

import { Button } from '@buildit/ui/button'

import Header from '@/components/layout/header'
import TeamList from '@/components/teams/team-list'
import { Icons } from '@/components/ui/icons'

/**
 * The Teams client page.
 * @returns Next.js RSC page.
 */
export default function TeamsClientPage(): JSX.Element {
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
        {/* TODO: Add Filter menu and display settings options */}
        <div className='h-full w-full'>
          <TeamList />
        </div>
      </div>
    </>
  )
}
