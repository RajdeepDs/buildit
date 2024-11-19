import { useState } from 'react'

import { Badge } from '@buildit/ui/badge'
import { Button } from '@buildit/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@buildit/ui/dropdown-menu'
import { Label } from '@buildit/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'
import { Separator } from '@buildit/ui/separator'

import { Icons } from '@/components/ui/icons'
import { useFilterStore } from '@/hooks/store'

interface DisplayMenuProps {
  groupingOptions?: { label: string; value: string }[]
  allDisplayProperties: string[]
}

/**
 * The display menu component. It contains the grouping and ordering options.
 * @param props The component props.
 * @param props.groupingOptions The grouping options.
 * @param props.allDisplayProperties The display properties.
 * @returns The display menu component.
 */
export default function DisplayMenu({
  groupingOptions,
  allDisplayProperties,
}: DisplayMenuProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const [grouping, setGrouping] = useState('noGrouping')

  const { setGroupBy, displayProperties, setDisplayProperties } =
    useFilterStore()

  // useEffect(() => {
  //   allDisplayProperties.forEach((property) => {
  //     setDisplayProperties(property)
  //   })
  // }, [allDisplayProperties, setDisplayProperties])

  const handleSelectGrouping = (group: string) => {
    setGroupBy(group)
    setGrouping(group)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'secondary'} className='text-sub' size={'sm'}>
          <Icons.settings className='size-4 mr-2 text-sub' />
          Display
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='p-0'>
        <div className='flex flex-col'>
          {groupingOptions && (
            <>
              <div className='flex items-center justify-between p-3'>
                <Label className='flex items-center text-xs select-none'>
                  <Icons.rows3 className='mr-2 size-4 text-sub' />
                  Grouping
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='w-2/4'>
                    <Button
                      variant={'secondary'}
                      size={'sm'}
                      className='flex justify-between h-7 focus:ring-0'
                    >
                      {
                        groupingOptions.find(
                          (option) => option.value === grouping,
                        )?.label
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
              <Separator />
            </>
          )}
          <div className='flex flex-col gap-3 p-3'>
            <Label className='select-none text-xs'>Display properties</Label>
            <div className='flex flex-wrap gap-1'>
              {allDisplayProperties.map((property) => (
                <Badge
                  key={property}
                  variant={
                    displayProperties.includes(property)
                      ? 'outline'
                      : 'secondary'
                  }
                  onClick={() => {
                    setDisplayProperties(property)
                  }}
                  className={`select-none cursor-pointer text-surface py-1 font-medium ${property === 'id' ? 'uppercase' : 'capitalize'}`}
                >
                  {property}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
