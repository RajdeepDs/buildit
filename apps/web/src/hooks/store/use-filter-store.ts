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

  // Access the Zustand store state and actions, assuming store is defined
  const and = useIssuesFilterStore((state) => state.and)
  const setFilter = useIssuesFilterStore((state) => state.setFilter)
  const removeFilter = useIssuesFilterStore((state) => state.removeFilter)

  return { and, setFilter, removeFilter }
}
