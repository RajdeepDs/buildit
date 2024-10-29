import { Badge } from '@buildit/ui/badge'

import { statuses } from '@/configs/issue-types'

import { Icons } from '../ui/icons'

interface TabContentItemProps {
  label: string
  items: string[] // Array of items (like statuses, priorities, etc.)
  itemCount?: Record<string, number> // Optional count object for item badges
}

/**
 * The tab content item component. This component is used to display the items of a tab content.
 * @param props The component props.
 * @param props.label The label of the tab content.
 * @param props.items The items to display.
 * @param props.itemCount The count of each item.
 * @returns The tab content item component.
 */
export default function TabContentItem({
  label,
  items,
  itemCount,
}: TabContentItemProps): JSX.Element {
  const sortedItems = items.sort()

  const getOptions = (item: string) => {
    switch (label) {
      case 'Status':
        return statuses.find((status) => status.value === item)
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col gap-1'>
      {sortedItems.length > 0 ? (
        sortedItems.map((item) => {
          const option = getOptions(item)
          const Icon = Icons[option?.icon as keyof typeof Icons]
          return (
            <div
              key={item}
              className='flex items-center justify-between p-2 border rounded-md bg-white hover:bg-weak'
            >
              <div className='flex items-center gap-2'>
                <Icon className='size-4 text-sub' />
                <span className='capitalize text-surface'>{item}</span>
              </div>
              {itemCount?.[item] !== undefined && (
                <Badge variant={'secondary'} className='text-sub'>
                  {itemCount[item]}
                </Badge>
              )}
            </div>
          )
        })
      ) : (
        <div>No {label} used</div>
      )}
    </div>
  )
}
