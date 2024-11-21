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
    value: 'todo',
    label: 'Todo',
    icon: 'todo',
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
    value: 'done',
    label: 'Done',
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

export const labelConfig: FilterSettings[] = [
  {
    value: 'bug',
    label: 'Bug',
    icon: 'red',
  },
  {
    value: 'feature',
    label: 'Feature',
    icon: 'blue',
  },
  {
    value: 'enhancement',
    label: 'Enhancement',
    icon: 'purple',
  },
]
