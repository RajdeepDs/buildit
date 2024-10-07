import { usePathname } from 'next/navigation'

import type { FilterStore } from '@/lib/store/filter-store'

import { createFilterStore } from '@/lib/store/filter-store'

export const useFilterStore = (): FilterStore => {
  let pathname = usePathname()

  // If the pathname is '/', set it to '/my-issues'
  if (pathname === '/') {
    pathname = '/my-issues'
  }

  const useIssuesFilterStore = createFilterStore(pathname)

  const and = useIssuesFilterStore((state) => state.and)
  const setFilter = useIssuesFilterStore((state) => state.setFilter)

  return { and, setFilter }
}
