'use client'

import { Button } from '@buildit/ui/button'

import { Icons } from '@/components/ui/icons'
import { priorityConfig, statusConfig } from '@/configs/filter/issues-config'

import { IssueModal } from '../modals/issue-modal'

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
      statusConfig.find((status) => status.value === group) ??
      priorityConfig.find((priority) => priority.value === group)
    )
  }

  // Determine the group type
  const groupType =
    (statusConfig.find((status) => status.value === group) && 'status') ??
    (priorityConfig.find((priority) => priority.value === group) && 'priority')

  const groupData = getGroupData(group)

  if (!groupData) return <></>

  const Icon = Icons[groupData.icon as keyof typeof Icons]

  return (
    <>
      <div className='flex items-center justify-between pr-2.5 mb-2'>
        <div className='flex items-center gap-2 bg-weak/50 px-3 py-1 min-w-32 border border-soft/50 rounded-md'>
          <Icon className='size-4 text-sub' />
          <h2 className='font-medium text-sm text-surface'>
            {groupData.label}
          </h2>
          <p className='text-sm text-soft'>{count}</p>
        </div>

        <IssueModal
          defaultValues={{
            [groupType as string]: group,
          }}
        >
          <Button
            variant={'ghost'}
            size={'icon'}
            className='size-7 rounded bg-weak/50 border border-soft/50'
          >
            <Icons.plus className='size-4 text-sub' />
          </Button>
        </IssueModal>
      </div>
    </>
  )
}
