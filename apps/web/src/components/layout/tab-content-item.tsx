import { useMemo } from 'react'

import { Badge } from '@buildit/ui/badge'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'

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
  const sortedItems = useMemo(() => items.sort(), [items])

  const getOptions = useMemo(() => {
    return (item: string) => {
      switch (label) {
        case 'Status':
          return statuses.find((status) => status.value === item)?.icon
        case 'Priority':
          return priorities.find((priority) => priority.value === item)?.icon
        case 'Teams':
          return 'team' // Default team icon
        default:
          return null
      }
    }
  }, [label])

  return (
    <div className='flex flex-col gap-1'>
      {sortedItems.length > 0 ? (
        sortedItems.map((item) => {
          const option = getOptions(item)
          const Icon = option ? Icons[option as keyof typeof Icons] : null

          return (
            <div
              key={item}
              className='flex items-center justify-between p-2.5 border border-soft rounded-md bg-white hover:bg-weak'
            >
              <div className='flex items-center gap-2'>
                {Icon && <Icon className='size-4 text-sub' />}
                <span className='capitalize text-surface'>{item}</span>
              </div>
              {itemCount?.[item] !== undefined && (
                <Badge
                  variant={'secondary'}
                  className='w-6 items-center flex justify-center p-0 text-sub'
                >
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
