import { Button } from '@buildit/ui/button'

import { cardConfig } from '@/config/features'

import {
  CardContainer,
  CardContent,
  CardDescription,
  CardFeature,
  CardFeatureContainer,
  CardHeader,
  CardIcon,
  CardTitle,
} from './ui/card'

/**
 * The workflow component
 * @returns JSX.Element
 */
export default function Workflow() {
  const { icon, title, description, features } = cardConfig.workflow
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon={icon} />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardFeatureContainer>
          {features.map((feature) => (
            <CardFeature key={feature.catchline} {...feature} />
          ))}
        </CardFeatureContainer>
        <section className='justify-between flex flex-col'>
          <h1 className='font-cal text-4xl text-strong leading-12 md:text-7xl'>
            Plan, <br className='hidden md:block' /> Execute &{' '}
            <br className='hidden md:block' /> Deliver.
          </h1>
          <p className='text-sub text-md font-medium'>
            Easier way to plan, track, and manage projects. Create your issues
            using one platform. Use one tool to collaborate, update progress,
            and achieve goals seamlessly.
          </p>
          <div className='grid gap-2 grid-cols-2 mt-4 sm:mt-0'>
            <a href='https://app.buildit.codes/signup' className='w-full'>
              <Button className='w-full'>Get started!</Button>
            </a>
            <a
              href='https://github.com/RajdeepDs/buildit'
              rel='noreferrer'
              target='_blank'
              className='w-full'
            >
              <Button variant={'secondary'} className='w-full'>
                Learn More
              </Button>
            </a>
          </div>
        </section>
      </CardContent>
    </CardContainer>
  )
}
