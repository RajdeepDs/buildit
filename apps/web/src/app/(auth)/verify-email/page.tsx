import { redirect } from 'next/navigation'

import { auth } from '@buildit/auth'

import VerifyCode from '@/components/auth/verify-code'

/**
 * The verify-email page of the application, if the user is already logged in they will be redirected to the home page.
 * @returns Next.js RSC page.
 */
export default async function VerifyEmail(): Promise<JSX.Element> {
  const { user } = await auth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className='h-fit space-y-6 max-w-[319px]'>
      <div className='flex flex-col items-start space-y-1'>
        <p className='font-semibold text-lg text-strong'>Plan it. Build it.</p>
        <h1 className='font-cal text-soft/75 text-xl tracking-wide'>
          Verify your BuildIt account
        </h1>
      </div>

      <VerifyCode email={user.email} userId={user.id} />
    </div>
  )
}
