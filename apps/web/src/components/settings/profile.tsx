'use client'

import { Button } from '@buildit/ui/button'

import ProfileForm from '@/components/forms/profile-form'
import { api } from '@/lib/trpc/react'

import SettingsHeader from './header'
import SubHeader from './sub-header'

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
        <SubHeader title='Email' description={user?.email!}>
          <Button variant={'secondary'} size={'sm'} className='font-normal'>
            Change email
          </Button>
        </SubHeader>
        <SubHeader
          title='Password'
          description='Change your password to login to your account.'
        >
          <Button variant={'secondary'} size={'sm'} className='font-normal'>
            Change password
          </Button>
        </SubHeader>
      </div>
    </div>
  )
}
