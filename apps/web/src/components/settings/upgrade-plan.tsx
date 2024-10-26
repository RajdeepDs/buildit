import { Badge } from '@buildit/ui/badge'

import SubHeader from '@/components/settings/sub-header'

/**
 * The upgrade plan component. This component is used to display the upgrade plan.
 * @returns The upgrade plan component.
 */
export default function UpgradePlan(): JSX.Element {
  return (
    <div className='flex flex-col space-y-4'>
      <SubHeader
        title='Active plan'
        description='You are currently on the free plan.'
      />
      <div className='flex item-center justify-between rounded-lg border p-4'>
        <div className='flex flex-col items-start gap-1'>
          <h1 className='text-lg font-semibold'>Free</h1>
          <p className='text-sm'>
            A product development tool designed to streamline the workflow of
            modern teams.
          </p>
          <span className='text-xs text-sub'>$0 per user/month</span>
        </div>
        <div className='flex my-auto'>
          <Badge className='h-fit py-2.5 px-5 border border-soft'>
            Current plan
          </Badge>
        </div>
      </div>
    </div>
  )
}
