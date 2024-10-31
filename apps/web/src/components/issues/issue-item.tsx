import Link from 'next/link'

import type { TIssue } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Checkbox } from '@buildit/ui/checkbox'
import { cn } from '@buildit/ui/cn'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'
import { useFilterStore } from '@/hooks/store'
import { formatDate } from '@/lib/date'

type IssueItemProps = Pick<
  TIssue,
  | 'id'
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
 * @param props.maxIssueIdWidth - The maximum width of the issue ID column.
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
  const { displayProperties, selectedIssues, setSelectedIssues } =
    useFilterStore()

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
          <div className='group flex items-center space-x-2'>
            <Checkbox
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIssues(issue.id)
              }}
              checked={selectedIssues.includes(issue.id)}
              className={`group-hover:opacity-100 opacity-0 transition-opacity duration-150 mr-2 ease-in-out ${selectedIssues.includes(issue.id) ? 'opacity-100' : 'opacity-0'}`}
            />
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
                className='text-sm text-soft select-none'
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
          <span className='text-sub text-sm font-medium ml-2 flex-grow truncate select-none'>
            {issue.title}
          </span>
          <div className='ml-auto flex items-center space-x-2 flex-shrink-0'>
            {renderDisplayProperty(
              'updated',
              <span
                className='text-soft text-xs whitespace-nowrap select-none'
                title={`Updated: ${updatedAt}`}
              >
                {updatedAt}
              </span>,
            )}
            {renderDisplayProperty(
              'created',
              <span
                className='text-soft text-xs whitespace-nowrap select-none'
                title={`Created: ${createdAt}`}
              >
                {createdAt}
              </span>,
            )}
            {renderDisplayProperty(
              'assignee',
              issue.assigneeId ? (
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
              ),
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
