import type { ValidIcon } from '@/components/ui/icons'

export interface Feature {
  icon: ValidIcon
  title: string
  description?: string
  features?: FeatureDescription[]
}

export interface FeatureDescription {
  icon: string
  catchline: string
  description: React.ReactNode
  badge?: string
}

export const cardConfig = {
  realtime: {
    icon: 'globe',
    title: 'Collaborate in real-time, Globally',
    description:
      'BuildIt brings your team together, no matter where they are. Seamlessly collaborate across time zones, continents, and oceans.',
    features: [
      {
        icon: 'bellDot',
        catchline: 'Instant updates and notifications',
        description:
          'Stay in sync with your team. Changes reflect instantly across all devices, keeping everyone on the same page.',
      },
      {
        icon: 'sync',
        catchline: 'Synchronized project views',
        description:
          'See what your teammates see. Shared, real-time project views ensure everyone has the latest information at their fingertips.',
      },
      {
        icon: 'orbit',
        catchline: 'Edge-powered performance',
        description:
          'Lightning-fast responsiveness with our Edge database. Experience minimal latency no matter where your team is located.',
      },
    ],
  },
}
