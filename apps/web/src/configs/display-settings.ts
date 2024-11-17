import type { FilterSettings } from '@buildit/utils/types/configs'

type DisplaySettings = Omit<FilterSettings, 'icon'>

export const IssuesGroupingOptions: DisplaySettings[] = [
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
export const ProjectsGroupingOptions: DisplaySettings[] = [
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

export const IssuesDisplayProperties = [
  'priority',
  'id',
  'status',
  'created',
  'updated',
  'assignee',
]

export const ProjectsDisplayProperties = ['status', 'priority', 'lead']
