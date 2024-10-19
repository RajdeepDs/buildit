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
}

export const createFilterStore = (pathname: string) =>
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
      }),
      {
        name: `filter${pathname}`,
      },
    ),
  )
