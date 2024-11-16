import type { TIssue } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@buildit/ui/context-menu'

import IssueCard from '@/components/issues/issue-card'
import { Icons } from '@/components/ui/icons'
import {
  priorityOptions,
  statusOptions,
  useAssigneeOptions,
} from '@/configs/filter-settings'
import { useFilterStore } from '@/hooks/store'
import { api } from '@/lib/trpc/react'

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

  const assigneeOptions = useAssigneeOptions()

  const mutation = api.issues.update_issue_properties.useMutation()

  const handleUpdate = (key: string, value: string | null) => {
    mutation.mutate({ id: issue.id, [key]: value })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <IssueCard
          issue={issue}
          isFirst={isFirst}
          isLast={isLast}
          maxIssueIdWidth={maxIssueIdWidth}
          displayProperties={displayProperties}
          selectedIssues={selectedIssues}
          setSelectedIssues={setSelectedIssues}
        />
      </ContextMenuTrigger>
      <ContextMenuContent className='w-48 relative'>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icons.status className='size-4 mr-2 text-sub' />
            Status
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='absolute left-1 -top-1 min-w-max'>
            {statusOptions.map((status) => {
              const Icon = Icons[status.icon as keyof typeof Icons]
              return (
                <ContextMenuCheckboxItem
                  key={status.value}
                  className='flex items-center'
                  checked={status.value === issue.status}
                  onClick={() => {
                    handleUpdate('status', status.value)
                  }}
                >
                  <Icon className='size-4 mr-2 text-sub' />
                  <span>{status.label}</span>
                </ContextMenuCheckboxItem>
              )
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icons.signalHigh className='size-4 mr-2 text-sub' />
            Priority
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='absolute left-1 -top-1 min-w-max'>
            {priorityOptions.map((priority) => {
              const Icon = Icons[priority.icon as keyof typeof Icons]
              return (
                <ContextMenuCheckboxItem
                  key={priority.value}
                  className='flex items-center'
                  checked={priority.value === issue.priority}
                  onClick={() => {
                    handleUpdate('priority', priority.value)
                  }}
                >
                  <Icon className='size-4 mr-2 text-sub' />
                  <span>{priority.label}</span>
                </ContextMenuCheckboxItem>
              )
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icons.userCircle2 className='size-4 mr-2 text-sub' />
            Assignee
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='absolute left-1 -top-1 min-w-max'>
            <ContextMenuCheckboxItem
              className='flex items-center'
              checked={!issue.assigneeId}
              onClick={() => {
                handleUpdate('assigneeId', null)
              }}
            >
              <Icons.user className='size-4 mr-2 text-sub' />
              <span>No assignee</span>
            </ContextMenuCheckboxItem>
            {assigneeOptions.map((assignee) => {
              return (
                <ContextMenuCheckboxItem
                  key={assignee.value}
                  className='flex items-center'
                  checked={assignee.value === issue.assigneeId}
                  onClick={() => {
                    handleUpdate('assigneeId', assignee.value)
                  }}
                >
                  {assignee.image && (
                    <Avatar className='size-4 mr-2'>
                      <AvatarImage src={assignee.image} />
                      <AvatarFallback>
                        {assignee.label?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span>{assignee.label}</span>
                </ContextMenuCheckboxItem>
              )
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Icons.trash2 className='size-4 mr-2 text-sub' />
          Delete
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
