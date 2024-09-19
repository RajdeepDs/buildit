import Link from 'next/link'

import type { TIssue } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@buildit/ui/context-menu'

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

/**
 * The Issue Item component to display a single issue.
 * @param props The component properties.
 * @param props.issue The issue to display.
 * @returns JSX component.
 */
export default function IssueItem({ issue }: { issue: IssueItemProps }) {
  const updatedAt = issue.updatedAt ? formatDate(issue.updatedAt) : undefined
  const createdAt = issue.createdAt ? formatDate(issue.createdAt) : undefined

  const priorityIconName = priorities.find(
    (priority) => priority.value === issue.priority,
  )?.icon
  const statusIconName = statuses.find(
    (status) => status.value === issue.status,
  )?.icon

  const PriorityIcon = Icons[priorityIconName as keyof typeof Icons]
  const StatusIcon = Icons[statusIconName as keyof typeof Icons]

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link
            href={`/issue/${issue.issueId}`}
            className='flex items-center justify-between border-b px-5 py-2 hover:bg-gray-100/50'
          >
            <div className='flex items-center space-x-4'>
              <PriorityIcon className='size-4 text-sub' />
              <p className='text-sm text-sub'>{issue.issueId}</p>
              <StatusIcon className='size-4 text-sub' />
              <p className='text-sm text-surface'>{issue.title}</p>
            </div>
            <div className='flex items-center gap-x-3'>
              <span className='text-soft text-xs'>{updatedAt}</span>
              <span className='text-soft text-xs'>{createdAt}</span>
              {issue.assigneeId && issue.assignee ? (
                <Avatar className='size-5'>
                  <AvatarImage
                    src={issue.assignee.image ?? ''}
                    alt={issue.assignee.name ?? ''}
                  />
                  <AvatarFallback>
                    {issue.assignee.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div>hello</div>
              )}
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-56'>
          <ContextMenuGroup>
            <ContextMenuItem>
              <Icons.trash className='mr-2 h-4 w-4' />
              Delete
              <ContextMenuShortcut>Delete</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </>
  )
}
