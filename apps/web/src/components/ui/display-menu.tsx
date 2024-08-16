import { useState } from 'react'

import { Button } from '@buildit/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'
import { Label } from '@buildit/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'

import { Icons } from '@/components/ui/icons'
import { groupingOptions, orderingOptions } from '@/configs/filter-settings'
import useMyIssuesStore from '@/lib/store/my-issues-store'

/**
 * The display menu component. It contains the grouping and ordering options.
 * @returns The display menu component.
 */
export default function DisplayMenu() {
  const store = useMyIssuesStore()

  const [grouping, setGrouping] = useState('noGrouping')
  const [ordering, setOrdering] = useState('noOrdering')

  const handleSelectGrouping = (group: string) => {
    store.setGroupBy(group)
    setGrouping(group)
  }
  const handleSelectOrdering = (order: string) => {
    setOrdering(order)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'secondary'} className='text-sub' size={'sm'}>
          <Icons.sliders className='h-4 w-4 mr-2 text-sub' />
          Display
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='flex flex-col space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='flex items-center text-xs'>
              <Icons.rows3 className='mr-1 h-4 w-4 text-sub' />
              Grouping
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='w-2/4'>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className='flex justify-between text-xs'
                >
                  {
                    groupingOptions.find((option) => option.value === grouping)
                      ?.label
                  }
                  <Icons.chevronDown className='h-4 w-4 text-sub' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {groupingOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => {
                      handleSelectGrouping(option.value)
                    }}
                    className='font-medium text-xs'
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='hidden items-center justify-between'>
            <Label className='flex items-center text-xs'>
              <Icons.arrowUpDown className='mr-1 h-4 w-4 text-sub' />
              Ordering
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='w-2/4'>
                <Button
                  variant={'secondary'}
                  className='flex justify-between font-medium text-xs'
                >
                  {
                    orderingOptions.find((option) => option.value === ordering)
                      ?.label
                  }
                  <Icons.chevronDown className='h-4 w-4 text-sub' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {orderingOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => {
                      handleSelectOrdering(option.value)
                    }}
                    className='font-medium text-xs'
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
