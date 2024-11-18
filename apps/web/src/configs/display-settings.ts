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

export const IssuesDisplayProperties = [
  'priority',
  'id',
  'status',
  'created',
  'updated',
  'assignee',
]

export const ProjectsDisplayProperties = ['status', 'priority', 'lead']
