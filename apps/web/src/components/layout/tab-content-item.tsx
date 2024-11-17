import { useMemo } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Badge } from '@buildit/ui/badge'

import { Icons } from '@/components/ui/icons'
import { priorities, statuses } from '@/configs/issue-types'

interface TabContentItemProps {
  label: string
  items: { name: string | null; image?: string | null }[] | string[]
  itemCount?: Record<string, number>
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
  const sortedItems = useMemo(() => {
    return Array.isArray(items) && typeof items[0] === 'object'
      ? [...(items as { name: string | null; image?: string | null }[])].sort(
          (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
        )
      : [...(items as string[])].sort()
  }, [items])

  const getOptions = useMemo(() => {
    return (item: string) => {
      switch (label) {
        case 'Status':
          if (item === 'planned') {
            return 'hexagon' // Custom icon for planned status, which is not in the statuses list because it's not in the issues statuses
          }
          return statuses.find((status) => status.value === item)?.icon
        case 'Priority':
          return priorities.find((priority) => priority.value === item)?.icon
        case 'Teams':
          return 'team' // Default team icon
        case 'Leads':
          return 'userCircle2' // Default user icon if no image
        default:
          return null
      }
    }
  }, [label])

  return (
    <div className='flex flex-col gap-1'>
      {sortedItems.length > 0 ? (
        sortedItems.map((item) => {
          const isObjectItem = typeof item === 'object' && item !== null
          const name = isObjectItem ? item.name : item
          const image = isObjectItem ? item.image : null
          const option = getOptions(name ?? '')
          const Icon = option ? Icons[option as keyof typeof Icons] : null

          return (
            <div
              key={name?.toString() ?? ''}
              className='flex items-center justify-between p-2.5 border border-soft rounded-md bg-white hover:bg-weak'
            >
              <div className='flex items-center gap-2'>
                {image ? (
                  <Avatar className='size-4'>
                    <AvatarImage src={image} />
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                ) : (
                  Icon && <Icon className='size-4 text-sub' />
                )}
                <span className='capitalize text-surface select-none'>
                  {name}
                </span>
              </div>
              {itemCount?.[name ?? ''] !== undefined && (
                <Badge
                  variant={'secondary'}
                  className='w-6 items-center flex justify-center p-0 text-sub'
                >
                  {itemCount[name ?? '']}
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
