import { Button } from '@buildit/ui/button'

/**
 * Hero section component. This component is used to display the hero section of the landing page.
 * @returns JSX.Element
 */
export default function HeroSection(): JSX.Element {
  return (
    <section className='pt-40 md:pt-72'>
      <div className='flex flex-col items-center space-y-8 text-center'>
        <h1 className='font-cal text-3xl text-strong md:text-7xl'>
          Build better <br className='' /> Together with BuildIt
        </h1>
        <p className='font-medium text-base text-sub md:text-xl'>
          A product development tool designed to streamline the{' '}
          <br className='hidden md:block' /> workflow of modern teams.
        </p>
        <a href='https://app.buildit.codes/signup'>
          <Button className='w-fit md:h-12 md:rounded-lg md:px-6 md:py-4 md:text-lg'>
            Get BuildIt free
          </Button>
        </a>
      </div>
    </section>
  )
}
