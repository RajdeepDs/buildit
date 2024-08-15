import type { Store } from '@/lib/store/my-issues-store'

import FilterMenu from '@/components/ui/filter-menu'
import SearchIssue from '@/components/ui/search-issues'

import DisplayMenu from './display-menu'

/**
 * The sub-header component. It contains the filter menu, search issue and display menu.
 * @param props The component props.
 * @param props.store The store.
 * @returns The sub-header component.
 */
export default function SubHeader({ store }: { store: Store }): JSX.Element {
  return (
    <div className='flex flex-1 items-center justify-between'>
      <FilterMenu store={store} />
      <div className='flex space-x-2 items-center'>
        <SearchIssue store={store} />
        <DisplayMenu />
      </div>
    </div>
  )
}
