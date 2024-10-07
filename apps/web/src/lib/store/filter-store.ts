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
    [key in Operator]?: any
  }
>

interface FilterQuery {
  [key: string]: FilterCondition | FilterQuery
}

export interface FilterStore {
  and: FilterQuery
  setFilter: (type: string, operator: Operator, value: any) => void
}

export const createFilterStore = (pathname: string) =>
  create<FilterStore>()(
    persist(
      (set) => ({
        and: {},
        setFilter: (type, operator, value) => {
          set((state) => {
            return {
              ...state.and, // keep the existing filters and add the new one
              and: {
                [type]: {
                  [operator]: value,
                },
              },
            }
          })
        },
      }),
      {
        name: `filter${pathname}`,
      },
    ),
  )
