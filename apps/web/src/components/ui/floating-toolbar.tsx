import { Button } from '@buildit/ui/button'
import { Separator } from '@buildit/ui/separator'

import { Icons } from './icons'

// TODO: Add a dynamic floating toolbar component - the contents of the toolbar should be changed based on the context or page where it is used.

/**
 * Floating toolbar component. This component is used to display all the display and other filter functionalities.
 * @returns JSX.Element
 */
export default function FloatingToolbar(): JSX.Element {
  return (
    <div className='bg-weak/20 p-2 border rounded-md shadow-md z-50'>
      <div className='flex items-center gap-2'>
        <Button size={'icon'} variant={'secondary'} className='h-8 rounded'>
          <Icons.plus className='size-4 text-sub' />
        </Button>
        <Button size={'icon'} variant={'secondary'} className='h-8 rounded'>
          <Icons.search className='size-4 text-sub' />
        </Button>
        <Separator orientation='vertical' className='h-6' />
        <Button size={'sm'} variant={'secondary'} className='rounded gap-1'>
          <Icons.listFilter className='size-4 text-sub' />
          <p className='text-sub'>Filter</p>
        </Button>
        <Button size={'sm'} variant={'secondary'} className='rounded gap-1'>
          <Icons.settings className='size-4 text-sub' />
          <p className='text-sub'>Display</p>
        </Button>
        <Separator orientation='vertical' className='h-6' />
        <Button size={'sm'} variant={'secondary'} className='rounded gap-1'>
          <Icons.command className='size-4 text-sub' />
          <p className='text-sub'>Command</p>
        </Button>
      </div>
    </div>
  )
}
