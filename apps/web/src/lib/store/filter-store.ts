import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  groupBy: string
  setGroupBy: (group: string) => void
  displayProperties: string[]
  setDisplayProperties: (property: string) => void
  selectedIssues: string[]
  setSelectedIssues: (issueId: string) => void
  clearSelectedIssues: () => void
}

const createFilterStore = (pathname: string) =>
  create<FilterStore>()(
    persist(
      (set) => {
        const defaultDisplayProperties = pathname.includes('projects')
          ? ['status', 'priority', 'lead']
          : ['priority', 'id', 'status', 'created', 'updated', 'assignee']

        return {
          and: [],
          setFilter: (type, operator, value) => {
            set((state) => ({
              and: [...state.and, { [type]: { [operator]: value } }],
            }))
          },
          updateFilter: (type, operator, value) => {
            set((state) => ({
              and: state.and.map((filter) =>
                filter[type] ? { [type]: { [operator]: value } } : filter,
              ),
            }))
          },
          removeFilter: (type) => {
            set((state) => ({
              and: state.and.filter((filter) => !filter[type]),
            }))
          },
          groupBy: 'No Grouping',
          setGroupBy: (group) => {
            set(() => ({ groupBy: group }))
          },
          displayProperties: defaultDisplayProperties,
          setDisplayProperties: (property) => {
            set((state) => {
              const currentProps = new Set(state.displayProperties)
              if (currentProps.has(property)) {
                currentProps.delete(property)
              } else {
                currentProps.add(property)
              }
              return { displayProperties: Array.from(currentProps) }
            })
          },
          selectedIssues: [],
          setSelectedIssues: (issueId) => {
            set((state) => ({
              selectedIssues: state.selectedIssues.includes(issueId)
                ? state.selectedIssues.filter((id) => id !== issueId)
                : [...state.selectedIssues, issueId],
            }))
          },
          clearSelectedIssues: () => {
            set(() => ({ selectedIssues: [] }))
          },
        }
      },
      {
        name: `filter${pathname}`,
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) =>
                key !== 'groupBy' &&
                key !== 'displayProperties' &&
                key !== 'selectedIssues',
            ),
          ),
      },
    ),
  )

export default createFilterStore
