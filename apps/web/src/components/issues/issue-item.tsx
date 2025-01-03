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
import { useAssigneeOptions } from '@/configs/filter/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/filter/issues-config'
import { useDeleteIssue } from '@/hooks/mutations/use-delete-issue'
import { useUpdateIssueProperties } from '@/hooks/mutations/use-update-issue-properties'
import { useFilterStore } from '@/hooks/store'

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
  const { displayProperties, selectedItems, setSelectedItems } =
    useFilterStore()

  const assigneeOptions = useAssigneeOptions()

  const { mutate: updateProperty } = useUpdateIssueProperties()
  const { mutate: deleteIssue } = useDeleteIssue()

  const handleUpdate = (key: string, value: string | null) => {
    updateProperty({ id: issue.id, [key]: value })
  }

  const handleDelete = () => {
    deleteIssue({ id: issue.id })
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
          selectedIssues={selectedItems}
          setSelectedIssues={setSelectedItems}
        />
      </ContextMenuTrigger>
      <ContextMenuContent className='w-48 relative'>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icons.status className='size-4 mr-2 text-sub' />
            Status
          </ContextMenuSubTrigger>
          <ContextMenuSubContent sideOffset={4} alignOffset={-5.5}>
            {statusConfig.map((status) => {
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
          <ContextMenuSubContent sideOffset={4}>
            {priorityConfig.map((priority) => {
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
          <ContextMenuSubContent sideOffset={4}>
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
        <ContextMenuItem
          onClick={() => {
            handleDelete()
          }}
        >
          <Icons.trash2 className='size-4 mr-2 text-sub' />
          Delete
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
