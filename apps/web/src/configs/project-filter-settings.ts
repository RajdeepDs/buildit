import type { FilterSettings } from '@buildit/utils/types/configs'

import { api } from '@/lib/trpc/react'

export const filterOptions: FilterSettings[] = [
  {
    label: 'Status',
    value: 'status',
    icon: 'backlog',
  },
  {
    label: 'Priority',
    value: 'priority',
    icon: 'signalHigh',
  },
  {
    label: 'Teams',
    value: 'teams',
    icon: 'team',
  },
  {
    label: 'Lead',
    value: 'lead',
    icon: 'userCircle2',
  },
]

export const statusOptions: FilterSettings[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: 'backlog',
  },
  {
    value: 'planned',
    label: 'Planned',
    icon: 'hexagon',
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: 'inProgress',
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: 'done',
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: 'canceled',
  },
]

export const priorityOptions: FilterSettings[] = [
  {
    value: 'no priority',
    label: 'No Priority',
    icon: 'minus',
  },
  {
    value: 'urgent',
    label: 'Urgent',
    icon: 'triangleAlert',
  },
  {
    value: 'high',
    label: 'High',
    icon: 'signalHigh',
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: 'signalMedium',
  },
  {
    value: 'low',
    label: 'Low',
    icon: 'signalLow',
  },
]

export const useTeamsOptions = () => {
  const { data: teams, isLoading, error } = api.team.get_teams.useQuery()

  if (isLoading) {
    return []
  }

  if (error) {
    return []
  }
  return (
    teams?.map((team) => ({
      value: team.id,
      label: team.name,
      icon: 'team',
    })) ?? []
  )
}

export const useLeadOptions = () => {
  const { data: teams, isLoading, error } = api.team.get_teams.useQuery()

  if (isLoading) {
    return []
  }

  if (error) {
    return []
  }

  return (
    teams
      ?.map((team) => {
        // Ensure team and user are defined before mapping
        if (team.user) {
          return {
            value: team.user.id,
            label: team.user.name,
            image: team.user.image,
            icon: 'image',
          }
        } else {
          return null
        }
      })
      .filter(Boolean) ?? []
  )
}
