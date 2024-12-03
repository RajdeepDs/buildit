'use client'

import { Badge } from '@buildit/ui/badge'

import MembersList from '@/components/settings/members-list'
import MembersOptions from '@/components/settings/members-options'
import SubHeader from '@/components/settings/sub-header'
import { api } from '@/lib/trpc/react'

/**
 * The members component. This component is used to display all the members.
 * @returns The members component.
 */
export default function Members(): JSX.Element {
  const { data: user } = api.user.get_user.useQuery()
  if (!user) return <div>Loading...</div>

  return (
    <div className='flex flex-col space-y-4 '>
      <SubHeader
        title='Manage members'
        description='Manage the members of this workspace.'
      >
        <Badge className=''>1 active member</Badge>
      </SubHeader>

      <div className='flex flex-col gap-3'>
        {/* MembersOptions is currently hidden */}
        <MembersOptions />
        <MembersList user={user} />
      </div>
    </div>
  )
}
