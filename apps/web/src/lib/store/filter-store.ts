import type { TIssue } from '@buildit/utils/types'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { allDisplayProperties } from '@/configs/display-settings'

type Operator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'and'
  | 'or'

type FilterCondition = Record<
  string,
  {
    [key in Operator]?: string
  }
>

export interface FilterQuery {
  [key: string]: FilterCondition | FilterQuery
}

export interface FilterStore {
  and: FilterQuery[]
  setFilter: (
    type: string,
    operator: Operator,
    value: FilterCondition | FilterQuery,
  ) => void
  updateFilter: (
    type: string,
    operator: Operator,
    value: FilterCondition | FilterQuery,
  ) => void
  removeFilter: (type: string) => void
  groupBy: keyof TIssue | 'No Grouping'
  setGroupBy: (group: keyof TIssue | 'No Grouping') => void
  displayProperties: string[]
  setDisplayProperties: (property: string) => void
}

const createFilterStore = (pathname: string) =>
  create<FilterStore>()(
    persist(
      (set) => ({
        and: [],
        setFilter: (type, operator, value) => {
          set((state) => {
            const newFilter = { [type]: { [operator]: value } }
            return {
              and: [...state.and, newFilter], // keep the existing filters and add the new one
            }
          })
        },
        updateFilter: (type, operator, value) => {
          set((state) => {
            const newFilter = { [type]: { [operator]: value } }
            return {
              and: state.and.map((filter) => {
                if (filter[type]) {
                  return newFilter // update the filter with the given type
                }
                return filter
              }),
            }
          })
        },
        removeFilter: (type) => {
          set((state) => {
            return {
              and: state.and.filter((filter) => !filter[type]), // remove the filter with the given type
            }
          })
        },
        groupBy: 'No Grouping',
        setGroupBy: (group) => {
          set(() => ({
            groupBy: group,
          }))
        },
        displayProperties: allDisplayProperties,
        setDisplayProperties: (property) => {
          set((state) => ({
            displayProperties: state.displayProperties.includes(property)
              ? state.displayProperties.filter((prop) => prop !== property)
              : [...state.displayProperties, property],
          }))
        },
      }),
      {
        name: `filter${pathname}`,
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => key !== 'groupBy' && key !== 'displayProperties',
            ),
          ),
      },
    ),
  )

export default createFilterStore
