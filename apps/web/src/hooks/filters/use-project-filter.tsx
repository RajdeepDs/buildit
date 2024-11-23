import { useMemo } from 'react'

import type { TProject } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'

import { Icons } from '@/components/ui/icons'
import {
  useLeadOptions,
  useTeamsOptions,
} from '@/configs/filter/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/filter/projects-config'
import { useLeadsSummary } from '@/hooks/use-lead-summary'
import { usePrioritySummary } from '@/hooks/use-priority-summary'
import { useStatusSummary } from '@/hooks/use-status-summary'
import { useTeamsSummary } from '@/hooks/use-teams-summary'

/**
 * The project filter hook. This hook is used in the project's filter component.
 * @param projects The list of issues.
 * @returns the filter options that is used to filter the projects.
 */
export function useProjectFilter(projects: TProject[] | undefined) {
  const { statuses, statusCount } = useStatusSummary(projects)
  const { priorities, priorityCount } = usePrioritySummary(projects)
  const { teams, teamCount } = useTeamsSummary(projects)
  const { uniqueLeads, leadCount } = useLeadsSummary(projects)

  const allTeams = useTeamsOptions()
  const allLeads = useLeadOptions()

  const filterOptions = useMemo(() => {
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
          const teamOption = allTeams.find((item) => item.value === team)
          return {
            value: teamOption?.value,
            label: teamOption?.label,
            icon: 'team',
            count: teamCount[team],
          }
        }),
      },
      {
        key: 'lead',
        label: 'Lead',
        icon: 'userCircle2',
        options: uniqueLeads.map((lead) => {
          const leadOption = allLeads.find((item) => item.value === lead)
          return {
            value: leadOption?.value ?? null,
            label: leadOption?.label ?? 'No lead',
            icon:
              leadOption?.icon === 'image' ? (
                <Avatar className='size-4'>
                  <AvatarImage src={leadOption.image!} />
                  <AvatarFallback>
                    <Icons.userCircle2 className='size-4 text-sub' />
                  </AvatarFallback>
                </Avatar>
              ) : (
                'userCircle2'
              ),
            count: leadCount[lead],
          }
        }),
      },
    ]
  }, [
    allLeads,
    allTeams,
    leadCount,
    priorities,
    priorityCount,
    statusCount,
    statuses,
    teamCount,
    teams,
    uniqueLeads,
  ])

  return { filterOptions }
}
