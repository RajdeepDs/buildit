import type { FilterSettings } from '@buildit/utils/types/configs'

export const groupingOptions: FilterSettings[] = [
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

export const orderingOptions: FilterSettings[] = [
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
