'use client'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'

/**
 * The Issues Group component to display the group of issues.
 * @param props The component properties.
 * @param props.group The group to display.
 * @returns JSX component.
 */
export default function IssuesGroup({ group }: { group: string }): JSX.Element {
  const groupByStatus = statuses.find((status) => status.value === group)
  const groupByPriority = priorities.find(
    (priority) => priority.value === group,
  )

  if (!groupByStatus && !groupByPriority) {
    return <></>
  }

  const Icon =
    Icons[
      (groupByStatus?.icon as keyof typeof Icons) ||
        (groupByPriority?.icon as keyof typeof Icons)
    ]
  return (
    <div className='flex items-center space-x-2 bg-soft/75 px-5 py-2'>
      <Icon className='h-4 w-4 text-sub' />
      <h2 className='font-medium text-sm text-strong'>
        {groupByStatus?.label || groupByPriority?.label}
      </h2>
    </div>
  )
}
