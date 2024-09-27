'use client'

import { Button } from '@buildit/ui/button'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'

/**
 * The Issues Group component to display the group of issues.
 * @param props The component properties.
 * @param props.group The group to display.
 * @param props.count The number of issue in this group
 * @returns JSX component.
 */
export default function IssuesGroup({
  group,
  count,
}: {
  group: string
  count: number
}): JSX.Element {
  // Retrieve either status or priority group by the value
  const getGroupData = (group: string) => {
    return (
      statuses.find((status) => status.value === group) ??
      priorities.find((priority) => priority.value === group)
    )
  }

  const groupData = getGroupData(group)

  if (!groupData) return <></>

  const Icon = Icons[groupData.icon as keyof typeof Icons]

  return (
    <div className='flex items-center justify-between pr-2.5 my-2'>
      <div className='flex items-center gap-2 bg-weak/50 px-3 py-1 w-32 border border-soft/50 rounded-md'>
        <Icon className='size-4 text-sub' />
        <h2 className='font-medium text-sm text-surface'>{groupData.label}</h2>
        <p className='text-sm text-soft'>{count}</p>
      </div>

      <Button
        variant={'ghost'}
        size={'icon'}
        className='size-7 rounded bg-weak/50 border border-soft/50'
      >
        <Icons.plus className='size-4 text-sub' />
      </Button>
    </div>
  )
}
