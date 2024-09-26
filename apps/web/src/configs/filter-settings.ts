import type { FilterSettings } from '@buildit/utils/types/configs'

export const filterOptions: FilterSettings[] = [
  {
    label: 'Status',
    value: 'status',
    icon: 'backlog',
  },
  {
    label: 'Priority',
    value: 'priority',
    icon: 'high',
  },
]

export const statusOptions: FilterSettings[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: 'backlog',
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
