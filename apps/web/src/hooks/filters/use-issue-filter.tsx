import { useMemo } from 'react'

import type { TIssue } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'

import { Icons } from '@/components/ui/icons'
import { useAssigneeOptions } from '@/configs/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/issue-config'
import { useAssigneeSummary } from '@/hooks/use-assignee-summary'
import { usePrioritySummary } from '@/hooks/use-priority-summary'
import { useStatusSummary } from '@/hooks/use-status-summary'
import { useTeamsSummary } from '@/hooks/use-teams-summary'

/**
 * The issue filter hook. This hook is used in the issue filter component.
 * @param issues The list of issues.
 * @returns the filter options that is used to filter the issues.
 */
export function useIssueFilter(issues: TIssue[] | undefined) {
  const { statuses, statusCount } = useStatusSummary(issues)
  const { priorities, priorityCount } = usePrioritySummary(issues)
  const { teams, teamCount } = useTeamsSummary(issues)
  const { uniqueAssignees, assigneeCount } = useAssigneeSummary(issues)

  const allAssignees = useAssigneeOptions()

  const filter = useMemo(() => {
    return [
      {
        key: 'status',
        label: 'Status',
        icon: 'backlog',
        options: statuses.map((status) => {
          const config = statusConfig.find((item) => item.value === status)
          return {
            value: status,
            label:
              config?.label ?? status.charAt(0).toUpperCase() + status.slice(1),
            icon: config?.icon ?? 'backlog',
            count: statusCount[status],
          }
        }),
      },
      {
        key: 'priority',
        label: 'Priority',
        icon: 'signalHigh',
        options: priorities.map((priority) => {
          const config = priorityConfig.find((item) => item.value === priority)
          return {
            value: priority,
            label:
              config?.label ??
              priority.charAt(0).toUpperCase() + priority.slice(1),
            icon: config?.icon ?? 'signalHigh',
            count: priorityCount[priority],
          }
        }),
      },
      {
        key: 'team',
        label: 'Team',
        icon: 'team',
        options: teams.map((team) => {
          return {
            value: team,
            label: team,
            icon: 'team',
            count: teamCount[team],
          }
        }),
      },
      {
        key: 'assignee',
        label: 'Assignee',
        icon: 'user',
        options: uniqueAssignees.map((assignee) => {
          const assigneeOption = allAssignees.find(
            (item) => item.value === assignee,
          )
          return {
            value: assigneeOption?.value,
            label: assigneeOption?.label,
            icon: (
              <Avatar>
                <AvatarImage src={assigneeOption?.image!} />
                <AvatarFallback>
                  <Icons.userCircle2 className='size-4 text-sub' />
                </AvatarFallback>
              </Avatar>
            ),
            count: assigneeCount[assignee],
          }
        }),
      },
    ]
  }, [
    statuses,
    statusCount,
    priorities,
    priorityCount,
    teams,
    teamCount,
    uniqueAssignees,
    assigneeCount,
    allAssignees,
  ])

  return { filter }
}
