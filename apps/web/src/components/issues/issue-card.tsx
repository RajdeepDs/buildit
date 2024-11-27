import Link from 'next/link'

import type { TIssue } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Checkbox } from '@buildit/ui/checkbox'
import { cn } from '@buildit/ui/cn'
import { Tooltip, TooltipContent, TooltipTrigger } from '@buildit/ui/tooltip'

import { Icons } from '@/components/ui/icons'
import { priorityConfig, statusConfig } from '@/configs/filter/issues-config'
import { formatDate, formatDateTime } from '@/lib/date'

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

interface IssueCardProps {
  issue: IssueItemProps
  isFirst: boolean
  isLast: boolean
  maxIssueIdWidth: number
  displayProperties: string[]
  selectedIssues: string[]
  setSelectedIssues: (issueId: string) => void
}

/**
 * The IssueCard component displays a single issue.
 * @param props - The props for the IssueCard component.
 * @param props.issue - The issue to display.
 * @param props.isFirst - Whether the issue is the first in the list.
 * @param props.isLast - Whether the issue is the last in the list.
 * @param props.maxIssueIdWidth - The maximum width of the issue ID column.
 * @param props.displayProperties - The properties to display.
 * @param props.selectedIssues - The selected issues.
 * @param props.setSelectedIssues - The function to set the selected issues.
 * @returns The IssueCard component.
 */
export default function IssueCard({
  issue,
  isFirst,
  isLast,
  maxIssueIdWidth,
  displayProperties,
  selectedIssues,
  setSelectedIssues,
}: IssueCardProps): JSX.Element {
  const priorityIconName = priorityConfig.find(
    (priority) => priority.value === issue.priority,
  )?.icon
  const statusIconName = statusConfig.find(
    (status) => status.value === issue.status,
  )?.icon

  const PriorityIcon = Icons[priorityIconName as keyof typeof Icons]
  const StatusIcon = Icons[statusIconName as keyof typeof Icons]

  const updatedAt = issue.updatedAt ? formatDate(issue.updatedAt) : undefined
  const createdAt = issue.createdAt ? formatDate(issue.createdAt) : undefined

  const updatedAtTime = issue.updatedAt
    ? formatDateTime(issue.updatedAt)
    : undefined
  const createdAtTime = issue.createdAt
    ? formatDateTime(issue.createdAt)
    : undefined

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
              <Tooltip>
                <TooltipTrigger>
                  <PriorityIcon
                    className='size-4 text-sub'
                    aria-label={`Priority: ${issue.priority}`}
                  />
                </TooltipTrigger>
                <TooltipContent className='capitalize'>
                  Priority: {issue.priority}
                </TooltipContent>
              </Tooltip>,
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
              <Tooltip>
                <TooltipTrigger>
                  <StatusIcon
                    className='size-4 text-sub'
                    aria-label={`Status: ${issue.status}`}
                  />
                </TooltipTrigger>
                <TooltipContent>Status: {issue.status}</TooltipContent>
              </Tooltip>,
            )}
          </div>
          <span className='text-sub text-sm font-medium ml-2 flex-grow truncate select-none'>
            {issue.title}
          </span>
          <div className='ml-auto flex items-center space-x-2 flex-shrink-0'>
            {renderDisplayProperty(
              'updated',
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className='text-soft text-xs whitespace-nowrap select-none'
                    title={`Updated: ${updatedAt}`}
                  >
                    {updatedAt}
                  </span>
                </TooltipTrigger>
                {updatedAtTime && (
                  <TooltipContent>{`Updated ${updatedAtTime}`}</TooltipContent>
                )}
              </Tooltip>,
            )}
            {renderDisplayProperty(
              'created',
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className='text-soft text-xs whitespace-nowrap select-none'
                    title={`Created: ${createdAt}`}
                  >
                    {createdAt}
                  </span>
                </TooltipTrigger>
                {createdAtTime && (
                  <TooltipContent align='end'>{`Created ${createdAtTime}`}</TooltipContent>
                )}
              </Tooltip>,
            )}
            {renderDisplayProperty(
              'assignee',
              <Tooltip>
                {issue.assigneeId ? (
                  issue.assignee && (
                    <>
                      <TooltipTrigger>
                        <Avatar className='size-5'>
                          <AvatarImage
                            src={issue.assignee.image ?? ''}
                            alt={issue.assignee.name ?? ''}
                          />
                          <AvatarFallback>
                            {issue.assignee.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>

                      <TooltipContent align='end'>
                        Admin: {issue.assignee.name}
                      </TooltipContent>
                    </>
                  )
                ) : (
                  <Icons.userCircle2
                    className='size-5 text-soft'
                    aria-label='Unassigned'
                  />
                )}
              </Tooltip>,
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
