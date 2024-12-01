import type { FilterSettings } from '@buildit/utils/types/configs'

export const statusConfig: FilterSettings[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: 'backlog',
    color: 'text-soft',
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: 'todo',
    color: 'text-soft',
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: 'inProgress',
    color: 'text-yellow-500',
  },
  {
    value: 'done',
    label: 'Done',
    icon: 'done',
    color: 'text-blue-500',
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: 'canceled',
    color: 'text-red-500',
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
