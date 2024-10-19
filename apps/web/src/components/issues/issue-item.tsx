import Link from 'next/link'

import type { TIssue } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Checkbox } from '@buildit/ui/checkbox'
import { cn } from '@buildit/ui/cn'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'
import { formatDate } from '@/lib/date'

type IssueItemProps = Pick<
  TIssue,
  | 'title'
  | 'issueId'
  | 'priority'
  | 'status'
  | 'assignee'
  | 'assigneeId'
  | 'updatedAt'
  | 'createdAt'
  | 'project'
>

const IssueItem = ({
  issue,
  isFirst,
  isLast,
}: {
  issue: IssueItemProps
  isFirst: boolean
  isLast: boolean
}) => {
  const priorityIconName = priorities.find(
    (priority) => priority.value === issue.priority,
  )?.icon
  const statusIconName = statuses.find(
    (status) => status.value === issue.status,
  )?.icon

  const PriorityIcon = Icons[priorityIconName as keyof typeof Icons]
  const StatusIcon = Icons[statusIconName as keyof typeof Icons]

  const updatedAt = issue.updatedAt ? formatDate(issue.updatedAt) : undefined
  const createdAt = issue.createdAt ? formatDate(issue.createdAt) : undefined

  return (
    <Link href={`/issue/${issue.issueId}`}>
      <div
        className={cn(
          ' grid grid-cols-[500px_2fr] border-x p-3 bg-white hover:bg-weak/50 transition-colors duration-200',
          isFirst && 'rounded-t-lg border-t',
          isLast ? 'rounded-b-lg border-b' : 'border-b',
        )}
      >
        <div className='grid grid-cols-[minmax(130px,_150px)_2fr] gap-2 items-center'>
          <div className='group grid grid-cols-[20px_20px_1fr_20px] gap-2 items-center'>
            {/* Fix: button cannot be descendant of Button  */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              role='checkbox'
              aria-checked='false'
              className='invisible group-hover:visible'
            >
              <Checkbox className='data-[state=checked]:visible' />
            </button>

            <PriorityIcon className='size-4 text-sub' />
            <p className='text-sm text-soft'>{issue.issueId}</p>
            <StatusIcon className='size-4 text-sub' />
          </div>
          <p className='text-sub text-sm font-medium'>{issue.title}</p>
        </div>
        <div className='flex items-center justify-end gap-3'>
          <span className='text-soft text-xs'>{updatedAt}</span>
          <span className='text-soft text-xs'>{createdAt}</span>
          {issue.assigneeId && issue.assignee && (
            <Avatar className='size-5'>
              <AvatarImage
                src={issue.assignee.image ?? ''}
                alt={issue.assignee.name ?? ''}
              />
              <AvatarFallback>{issue.assignee.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </Link>
  )
}

export default IssueItem
