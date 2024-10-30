import Link from 'next/link'

import type { TIssue } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { cn } from '@buildit/ui/cn'

import { priorities, statuses } from '@/configs/issue-types'
import { useFilterStore } from '@/hooks/store'
import { formatDate } from '@/lib/date'

import { Icons } from '../ui/icons'

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

/**
 * The IssueItem component displays a single issue in a list of issues.
 * @param props - The props for the IssueItem component.
 * @param props.issue - The issue to display.
 * @param props.isFirst - Whether the issue is the first in the list.
 * @param props.isLast - Whether the issue is the last in the list.
 * @param props.maxIssueIdWidth
 * @returns The IssueItem component.
 */
export default function IssueItem({
  issue,
  isFirst,
  isLast,
  maxIssueIdWidth,
}: {
  issue: IssueItemProps
  isFirst: boolean
  isLast: boolean
  maxIssueIdWidth: number
}) {
  const { displayProperties } = useFilterStore()
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

  const renderDisplayProperty = (property: string, content: React.ReactNode) =>
    displayProperties.includes(property) ? content : null

  return (
    <Link href={`/issue/${issue.issueId}`} passHref legacyBehavior>
      <div
        className={cn(
          'flex items-center border-x p-3 bg-white hover:bg-weak/50 transition-colors duration-200',
          isFirst && 'rounded-t-lg border-t',
          isLast ? 'rounded-b-lg border-b mb-2' : 'border-b',
        )}
        role='listitem'
      >
        <div className='flex items-center w-full'>
          <div className='flex items-center space-x-2'>
            {renderDisplayProperty(
              'priority',
              <PriorityIcon
                className='size-4 text-sub'
                aria-label={`Priority: ${issue.priority}`}
              />,
            )}
            {renderDisplayProperty(
              'id',
              <span
                data-column-id='issueId'
                className='text-sm text-soft'
                style={{ width: `${maxIssueIdWidth}px` }}
              >
                {issue.issueId}
              </span>,
            )}
            {renderDisplayProperty(
              'status',
              <StatusIcon
                className='size-4 text-sub'
                aria-label={`Status: ${issue.status}`}
              />,
            )}
          </div>
          <span className='text-sub text-sm font-medium ml-2 flex-grow truncate'>
            {issue.title}
          </span>
          <div className='ml-auto flex items-center space-x-2 flex-shrink-0'>
            {renderDisplayProperty(
              'updated',
              <span
                className='text-soft text-xs whitespace-nowrap'
                title={`Updated: ${updatedAt}`}
              >
                {updatedAt}
              </span>,
            )}
            {renderDisplayProperty(
              'created',
              <span
                className='text-soft text-xs whitespace-nowrap'
                title={`Created: ${createdAt}`}
              >
                {createdAt}
              </span>,
            )}
            {displayProperties.includes('assignee') && (
              <>
                {issue.assigneeId ? (
                  issue.assignee && (
                    <Avatar className='size-5'>
                      <AvatarImage
                        src={issue.assignee.image ?? ''}
                        alt={issue.assignee.name ?? ''}
                      />
                      <AvatarFallback>
                        {issue.assignee.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )
                ) : (
                  <Icons.userCircle2
                    className='size-5 text-soft'
                    aria-label='Unassigned'
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
