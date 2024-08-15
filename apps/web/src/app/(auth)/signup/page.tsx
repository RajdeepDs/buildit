import Link from 'next/link'

import type { Metadata } from 'next'

import { Separator } from '@buildit/ui/separator'

import { OauthButton } from '@/components/auth/oauth-buttons'
import SignUpForm from '@/components/auth/signup-form'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create your BuildIt account',
}

/**
 * The signup page of the application, if the user is already logged in they will be redirected to the home page.
 * @returns Next.js RSC page.
 */
export default function SignUpPage() {
  return (
    <div className='h-fit max-w-72 space-y-6'>
      <div className='flex flex-col items-start space-y-1'>
        <p className='font-semibold text-lg text-strong'>Plan it. Build it.</p>
        <h1 className='font-cal text-soft/75 text-xl tracking-wide'>
          Create your BuildIt account
        </h1>
      </div>
      <OauthButton />
      <Separator />
      <SignUpForm />
      <p className='text-sm text-center text-soft'>
        Already have an account?{' '}
        <Link href={'/login'} className='hover:underline hover:text-strong'>
          Log in
        </Link>
      </p>
    </div>
  )
}
