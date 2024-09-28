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
    icon: 'signalHigh',
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

type DisplaySettings = Omit<FilterSettings, 'icon'>

export const groupingOptions: DisplaySettings[] = [
  {
    label: 'Status',
    value: 'status',
  },
  {
    label: 'Priority',
    value: 'priority',
  },
  {
    label: 'No grouping',
    value: 'noGrouping',
  },
]

export const orderingOptions: DisplaySettings[] = [
  {
    label: 'No ordering',
    value: 'noOrdering',
  },
  {
    label: 'Status',
    value: 'status',
  },
  {
    label: 'Priority',
    value: 'priority',
  },
  {
    label: 'Last updated',
    value: 'lastUpdated',
  },
  {
    label: 'Last created',
    value: 'lastCreated',
  },
]
