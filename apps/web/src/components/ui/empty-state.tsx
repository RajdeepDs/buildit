import { Icons } from '@/components/ui/icons'
import { emptyStateContent } from '@/configs/empty-state'

interface EmptyStateProps {
  id: keyof typeof emptyStateContent
}

/**
 * The EmptyState component to display a message when there is no data to show.
 * @param props The props for the component.
 * @param props.id The id of the empty state content.
 * @returns JSX Element.
 */
export default function EmptyState({ id }: EmptyStateProps): JSX.Element {
  const content = emptyStateContent[id] as {
    icon: string
    title: string
    description: string
    primary: JSX.Element
  }

  const { icon, title, description, primary } = content

  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex flex-col items-start p-4'>
        <div className='border rounded-md mb-2'>
          <Icon className='size-5 text-sub m-2' />
        </div>
        <h2 className='text-lg font-semibold text-surface mb-1'>{title}</h2>
        <p className='text-sub text-sm mb-4 w-[420px]'>{description}</p>
        {primary}
      </div>
    </div>
  )
}
