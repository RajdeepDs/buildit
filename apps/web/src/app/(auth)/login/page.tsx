import Link from 'next/link'
import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { auth } from '@buildit/auth'
import { Separator } from '@buildit/ui/separator'

import { OauthButton } from '@/components/auth/oauth-buttons'
import SignInForm from '@/components/auth/signin-form'

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in your BuildIt account',
}

/**
 * The login page of the application, if the user is already logged in they will be redirected to the home page.
 * @returns Next.js RSC page.
 */
export default async function LoginPage(): Promise<JSX.Element> {
  const { user } = await auth()

  if (user) {
    redirect('/')
  }

  return (
    <div className='h-fit max-w-72 space-y-6'>
      <div className='flex flex-col items-start space-y-1'>
        <p className='font-semibold text-lg text-strong'>Plan it. Build it.</p>
        <h1 className='font-cal text-soft/75 text-xl tracking-wide'>
          Log in to your BuildIt account
        </h1>
      </div>
      <OauthButton />
      <Separator />
      <SignInForm />
      <p className='text-sm text-center text-soft'>
        New to BuildIt?{' '}
        <Link href={'/signup'} className='hover:underline hover:text-strong'>
          Sign up
        </Link>
      </p>
    </div>
  )
}
