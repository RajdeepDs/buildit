'use client'

import { useParams, useRouter } from 'next/navigation'

import { z } from 'zod'

import CreateTeamForm from '@/components/getting-started/create-team-form'
import UserProfileForm from '@/components/getting-started/user-profile-form'
import WorkspaceSetupForm from '@/components/getting-started/workspace-setup-form'

const INITIAL_STEP = 'workspace-setup'

const steps = ['workspace-setup', 'create-team', 'user-profile'] as const

const stepRouteSchema = z.object({
  step: z.enum(steps).default(INITIAL_STEP),
})

const stepTransform = (step: (typeof steps)[number]) => {
  return steps.includes(step) ? step : INITIAL_STEP
}

/**
 * The onboarding client page of the application, to onboard the user on BuildIt.
 * @returns Next.js RSC page.
 */
export default function OnboardingPageClient(): JSX.Element {
  const { step } = useParams()

  const router = useRouter()

  const result = stepRouteSchema.safeParse({
    step: step?.at(0),
  })

  const currentStep = result.success ? result.data.step : INITIAL_STEP

  const headers = [
    {
      title: 'Welcome to BuildIt!',
      subtitle: "Let's get you started with your workspace setup.",
    },
    {
      title: 'Create your team',
      subtitle: 'Start by creating your team for your workspace.',
    },
    {
      title: 'User profile',
      subtitle: 'We need some information to set up your user profile.',
    },
  ]

  const goToIndex = (index: number) => {
    if (index >= 0 && index < steps.length) {
      // eslint-disable-next-line security/detect-object-injection
      const newStep = steps[index] ?? INITIAL_STEP
      router.push(`/getting-started/${stepTransform(newStep)}`)
    } else {
      router.push(`/getting-started/${stepTransform(INITIAL_STEP)}`)
    }
  }

  const currentStepIndex = steps.indexOf(currentStep)

  const isValidIndex = (index: number, array: unknown[]): index is number => {
    return index >= 0 && index < array.length
  }

  return (
    <div className='h-fit max-w-max space-y-6'>
      <p className='text-soft text-xs'>
        Step {currentStepIndex + 1} of {steps.length}
      </p>
      <header>
        <h1 className='font-cal text-2xl text-strong'>
          {isValidIndex(currentStepIndex, headers)
            ? // eslint-disable-next-line security/detect-object-injection
              headers[currentStepIndex]?.title
            : 'Undefined title'}
        </h1>
        <p className='text-sm text-soft'>
          {isValidIndex(currentStepIndex, headers) &&
            // eslint-disable-next-line security/detect-object-injection
            headers[currentStepIndex]?.subtitle}
        </p>
      </header>
      <div>
        {currentStep === 'workspace-setup' && (
          <WorkspaceSetupForm
            nextStep={() => {
              goToIndex(1)
            }}
          />
        )}
        {currentStep === 'create-team' && (
          <CreateTeamForm
            nextStep={() => {
              goToIndex(2)
            }}
          />
        )}
        {currentStep === 'user-profile' && <UserProfileForm />}
      </div>
    </div>
  )
}
