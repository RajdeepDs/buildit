'use client'

import ProfileForm from '@/components/forms/profile-form'
import SettingsHeader from '@/components/settings/header'
import ChangePassword from '@/components/settings/modals/change-password'
import SubHeader from '@/components/settings/sub-header'
import { api } from '@/lib/trpc/react'

/**
 * The profile component. This component is used to display the user's profile.
 * @returns The profile component.
 */
export default function Profile(): JSX.Element {
  const { data: user, isLoading, error } = api.user.get_user.useQuery()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='flex flex-col space-y-4'>
      <div className='mb-6'>{user && <ProfileForm user={user} />}</div>
      <SettingsHeader title='Account Security' />
      <div className='space-y-6'>
        {/* <SubHeader title='Email' description={user?.email}>
          <ChangeEmail email={user?.email} />
        </SubHeader> */}
        <SubHeader
          title='Password'
          description='Change your password to login to your account.'
        >
          <ChangePassword user={user} />
        </SubHeader>
      </div>
    </div>
  )
}
