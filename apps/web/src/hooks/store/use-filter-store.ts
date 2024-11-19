import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import type { FilterStore } from '@/lib/store/filter-store'

import createFilterStore from '@/lib/store/filter-store'

const filterStoreInstances: Record<
  string,
  ReturnType<typeof createFilterStore> | undefined
> = {}

export const useFilterStore = (): FilterStore => {
  let pathname = usePathname()

  // Default pathname to '/my-issues' if it's '/'
  if (pathname === '/') {
    pathname = '/my-issues'
  }

  // Memoize and create the store once per pathname
  const useIssuesFilterStore = useMemo(() => {
    if (!filterStoreInstances[pathname]) {
      filterStoreInstances[pathname] = createFilterStore(pathname)
    }
    return filterStoreInstances[pathname]
  }, [pathname])

  // Safety check to ensure the store is not undefined
  if (!useIssuesFilterStore) {
    throw new Error('Filter store could not be created.')
  }

  // Access the Zustand store state and actions
  const and = useIssuesFilterStore((state) => state.and)
  const setFilter = useIssuesFilterStore((state) => state.setFilter)
  const updateFilter = useIssuesFilterStore((state) => state.updateFilter)
  const removeFilter = useIssuesFilterStore((state) => state.removeFilter)

  const groupBy = useIssuesFilterStore((state) => state.groupBy)
  const setGroupBy = useIssuesFilterStore((state) => state.setGroupBy)

  const displayProperties = useIssuesFilterStore(
    (state) => state.displayProperties,
  )
  const setDisplayProperties = useIssuesFilterStore(
    (state) => state.setDisplayProperties,
  )

  const selectedItems = useIssuesFilterStore((state) => state.selectedItems)
  const setSelectedItems = useIssuesFilterStore(
    (state) => state.setSelectedItems,
  )
  const clearSelectedItems = useIssuesFilterStore(
    (state) => state.clearSelectedItems,
  )

  return {
    and,
    setFilter,
    updateFilter,
    removeFilter,
    groupBy,
    setGroupBy,
    displayProperties,
    setDisplayProperties,
    selectedItems,
    setSelectedItems,
    clearSelectedItems,
  }
}
