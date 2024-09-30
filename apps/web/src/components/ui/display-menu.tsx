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
import { groupingOptions } from '@/configs/display-settings'
import { useMyIssues } from '@/hooks/store'

/**
 * The display menu component. It contains the grouping and ordering options.
 * @returns The display menu component.
 */
export default function DisplayMenu() {
  const [open, setOpen] = useState(false)
  const [grouping, setGrouping] = useState('noGrouping')

  const { setGroupBy } = useMyIssues()

  const handleSelectGrouping = (group: string) => {
    setGroupBy(group)
    setGrouping(group)
    setOpen(!open)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'secondary'} className='text-sub' size={'sm'}>
          <Icons.settings className='size-4 mr-2 text-sub' />
          Display
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <div className='flex flex-col space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='flex items-center '>
              <Icons.rows3 className='mr-2 h-4 w-4 text-sub' />
              Grouping
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='w-2/4'>
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  className='flex justify-between'
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
        </div>
      </PopoverContent>
    </Popover>
  )
}
