import { useEffect, useRef, useState } from 'react'

import { Badge } from '@buildit/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@buildit/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'
import { SidebarMenuButton } from '@buildit/ui/sidebar'
import { toast } from '@buildit/ui/toast'

import { Icons } from '@/components/ui/icons'
import { labelConfig } from '@/configs/issue-config'
import { api } from '@/lib/trpc/react'

interface LabelsProps {
  id: string
  labels: string[] | null
}

/**
 * The Labels component is the sidebar group that displays the labels of the issue.
 * @param props The props for the Labels component.
 * @param props.id The ID of the issue.
 * @param props.labels The labels of the issue.
 * @returns JSX.Element
 */
export default function Labels({ id, labels }: LabelsProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const commandRef = useRef<HTMLDivElement>(null)

  const [activeItem, setActiveItem] = useState('')
  const [labelOption, setLabelOption] = useState<string[]>(labels ?? [])
  const [initialLabels, setInitialLabels] = useState<string[]>(labels ?? [])

  const mutation = api.issues.update_issue_properties.useMutation({
    onSuccess: ({ message }) => {
      toast({
        description: message,
      })
    },
    onError: ({ message }) => {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: message,
      })
    },
  })

  useEffect(() => {
    if (
      !open &&
      JSON.stringify(labelOption) !== JSON.stringify(initialLabels)
    ) {
      setInitialLabels(labelOption)
      mutation.mutate({ id, labels: labelOption })
    }
  }, [open, labelOption, initialLabels, id, mutation])

  const handleSelect = (value: string) => {
    const updatedLabels = labelOption.includes(value)
      ? labelOption.filter((item) => item !== value)
      : [...labelOption, value]

    setLabelOption(updatedLabels)
    setActiveItem('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='flex flex-wrap items-center gap-2' asChild>
        <div>
          {labelOption.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {labelOption.map((item) => (
                <Badge
                  key={item}
                  variant='outline'
                  className='bg-white px-2 py-0.5 flex items-center h-8'
                >
                  {item}
                </Badge>
              ))}
            </div>
          )}
          <SidebarMenuButton
            className={`text-sub font-medium justify-start ${labelOption.length > 0 ? 'w-fit' : 'w-full'}`}
            onClick={() => {
              setActiveItem('label')
            }}
            isActive={activeItem === 'label'}
          >
            {labelOption.length > 0 ? (
              <span className='flex items-center'>
                <Icons.plus className='size-4 text-sub' />
              </span>
            ) : (
              <span className='flex items-center'>
                <Icons.tag className='size-4 text-sub mr-2' />
                Add Label
              </span>
            )}
          </SidebarMenuButton>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start' side='left'>
        <Command ref={commandRef}>
          <CommandInput
            placeholder='Search labels...'
            className='px-2'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No labels found.</CommandEmpty>
            <CommandGroup>
              {labelConfig.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    handleSelect(item.value)
                  }}
                  className='flex items-center px-2 py-1.5 cursor-pointer'
                >
                  <div className='w-4 h-4 mr-2 flex items-center justify-center'>
                    {labelOption.includes(item.value) && (
                      <Icons.checkIcon className='size-4 text-sub' />
                    )}
                  </div>
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
