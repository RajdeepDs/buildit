import type { TIssue } from '@buildit/utils/types'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'

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
  const priorityIconName = priorities.find(
    (priority) => priority.value === issue.priority,
  )?.icon

  const statusIconName = statuses.find(
    (status) => status.value === issue.status,
  )?.icon

  const PriorityIcon = Icons[priorityIconName as keyof typeof Icons]
  const StatusIcon = Icons[statusIconName as keyof typeof Icons]

  return (
    <div className='flex items-center space-x-4'>
      <p className='text-sm text-sub'>{issue.issueId}</p>
      <p className='text-sm text-surface'>{issue.title}</p>
    </div>
  )
}
