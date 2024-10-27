'use client'

import { Button } from '@buildit/ui/button'
import { Separator } from '@buildit/ui/separator'

import Header from '@/components/layout/header'
import { Icons } from '@/components/ui/icons'

/**
 * The Team Projects client page.
 * @returns Next.js RSC page.
 */
export default function TeamProjectsClientPage(): JSX.Element {
  return (
    <>
      <div className='h-full flex flex-col gap-2'>
        <Header>
          <div className='flex items-center gap-2'>
            <Button variant={'secondary'} size={'sm'} className='h-7'>
              <Icons.plus className='size-4 text-sub mr-1' />
              Create project
            </Button>
            <Separator orientation='vertical' className='h-5 ml-1' />
            <Button variant={'ghost'} size={'icon'} className='size-7'>
              <Icons.panelRight className='size-4 text-sub' />
            </Button>
          </div>
        </Header>
      </div>
    </>
  )
}
