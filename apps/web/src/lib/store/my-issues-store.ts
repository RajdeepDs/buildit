import { create } from 'zustand'

export interface Filter {
  filter: string
  value: string
}

export interface MyIssuesStore {
  filters: Filter[]
  addOrUpdateFilter: (newFilter: Filter) => void
  removeFilter: (filterType: string) => void
}

const useMyIssuesStore = create<MyIssuesStore>((set) => ({
  filters: [],
  addOrUpdateFilter: (newFilter) => {
    set((state) => {
      // Check if the filter type already exists, then update the value
      const existingFilterIndex = state.filters.findIndex(
        (filter) => filter.filter === newFilter.filter,
      )

      if (existingFilterIndex >= 0) {
        const updatedFilters = [...state.filters]
        // eslint-disable-next-line security/detect-object-injection
        updatedFilters[existingFilterIndex] = newFilter
        return { filters: updatedFilters }
      }

      // If not, add the new filter
      return { filters: [...state.filters, newFilter] }
    })
  },
  removeFilter: (filterType) => {
    set((state) => ({
      filters: state.filters.filter((filter) => filter.filter !== filterType),
    }))
  },
}))

export default useMyIssuesStore
