import { redirect } from 'next/navigation'

import { auth } from '@buildit/auth'

import WaitlistForm from '@/components/auth/waitlist-form'

/**
 * The Join page that allow users to have a waitlist to join the platform.
 * @returns The Join page.
 */
export default async function JoinPage(): Promise<JSX.Element> {
  const { user } = await auth()

  if (user) {
    redirect('/')
  }
  return (
    <div className='h-fit max-w-72 space-y-6'>
      <div className='flex flex-col items-start space-y-1'>
        <p className='font-semibold text-lg text-strong'>Plan it. Build it.</p>
        <h1 className='font-cal text-soft/75 text-xl tracking-wide'>
          Join our waitlist!
        </h1>
      </div>
      <WaitlistForm />
    </div>
  )
}
