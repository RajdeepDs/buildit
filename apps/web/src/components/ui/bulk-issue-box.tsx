import { Icons } from '@/components/ui/icons'

/**
 * The bulk issue box. This component is used to bulk issue handling.
 * @param props The props object
 * @param props.selectedIssuesCount The selected issues count
 * @returns JSX.Element
 */
export default function BulkIssueBox({
  selectedIssuesCount,
}: {
  selectedIssuesCount: number
}): JSX.Element {
  return (
    <div className='flex items-center rounded-md border text-sm divide-x h-8 border-dashed divide-dashed'>
      <span className='flex items-center gap-1 px-3 text-sub select-none'>
        {selectedIssuesCount} selected
      </span>
      <button
        className='rounded-e-md h-full px-2 hover:bg-weak'
        aria-label='Clear selection'
        onClick={() => {
          console.log('Clear selection')
        }}
      >
        <Icons.x className='size-4 text-sub' />
      </button>
    </div>
  )
}
