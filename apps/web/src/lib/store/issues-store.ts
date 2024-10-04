import type { TIssue } from '@buildit/utils/types'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FilterCondition = Record<string, Record<string, any[]>>

interface Filter {
  and: FilterCondition[]
}

export interface IssueStore {
  filters: Filter
  addOrUpdateFilter: (newFilter: FilterCondition) => void
  removeFilter: (filterType: string) => void
  groupBy: keyof TIssue | 'No Grouping'
  setGroupBy: (group: keyof TIssue | 'No Grouping') => void
}

const createIssueStore = (name: string) =>
  create<IssueStore>()(
    persist(
      (set) => ({
        filters: { and: [] },
        addOrUpdateFilter: (newFilter) => {
          set((state) => {
            const existingFilterIndex = state.filters.and.findIndex((filter) =>
              Object.keys(filter).includes(Object.keys(newFilter)[0] ?? ''),
            )

            if (existingFilterIndex >= 0) {
              const updatedFilters = [...state.filters.and]
              // eslint-disable-next-line security/detect-object-injection
              updatedFilters[existingFilterIndex] = newFilter
              return { filters: { and: updatedFilters } }
            }

            return { filters: { and: [...state.filters.and, newFilter] } }
          })
        },
        removeFilter: (filterType) => {
          set((state) => ({
            filters: {
              and: state.filters.and.filter(
                (filter) => !Object.keys(filter).includes(filterType),
              ),
            },
          }))
        },
        groupBy: 'No Grouping',
        setGroupBy: (group) => {
          set(() => ({
            groupBy: group,
          }))
        },
      }),
      {
        name: `issues-storage-${name}`,
      },
    ),
  )

export const useAllIssuesStore = createIssueStore('all')
export const useActiveIssuesStore = createIssueStore('active')
export const useBacklogIssuesStore = createIssueStore('backlog')
