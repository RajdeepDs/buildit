import { redirect } from 'next/navigation'

import type { Metadata } from 'next'

import { auth } from '@buildit/auth'

import OnboardingPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Getting Started',
  description: 'Get started with BuildIt.',
}

/**
 * The onboarding page of the application, to onboard the user on BuildIt. If the user is not logged in, they will be redirected to the login page.
 * @returns Next.js RSC page.
 */
export default async function OnboardingPage(): Promise<JSX.Element> {
  const { user } = await auth()
  if (!user) {
    redirect('/login')
  }

  return <OnboardingPageClient />
}
