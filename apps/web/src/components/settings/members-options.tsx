import { Input } from '@buildit/ui/input'

import InviteMember from '@/components/settings/modals/invite-member'

/**
 * MembersOptions component. This component is used to display the filter out the members.
 * @returns The members options component.
 */
export default function MembersOptions(): JSX.Element {
  return (
    <div className='flex items-center justify-between'>
      <Input
        placeholder='Search by name or email'
        className='bg-weak h-8 w-1/3 shadow-none'
      />
      <InviteMember />
    </div>
  )
}
