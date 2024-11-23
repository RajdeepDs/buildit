import type { FilterSettings } from '@buildit/utils/types/configs'

export const statusConfig: FilterSettings[] = [
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

export const priorityConfig: FilterSettings[] = [
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
