import type { ValidIcon } from '@/components/ui/icons'
import type { FeatureDescription } from '@/config/features.ts'

import { Badge } from '@buildit/ui/badge'

import { Icons } from '@/components/ui/icons'
import Shell from '@/components/ui/shell'
import { cn } from '@/lib/utils'

/**
 * The Card container component
 * @param props The props object
 * @param props.children The children to render
 * @returns JSX.Element
 */
export function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <Shell className='flex flex-col gap-6 bg-gradient-to-br from-0% from-soft to-20% to-transparent'>
      {children}
    </Shell>
  )
}

/**
 * The Card header component
 * @param props The props object
 * @param props.children The children to render
 * @returns JSX.Element
 */
export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      {children}
    </div>
  )
}

/**
 * The Card Icon component
 * @param props The props object
 * @param props.icon The icon to render
 * @returns JSX.Element
 */
export function CardIcon({ icon }: { icon: string }) {
  const Icon = Icons[icon as ValidIcon]
  return (
    <div className='rounded-full border border-soft p-2'>
      <Icon className='h-5 w-5' />
    </div>
  )
}

/**
 * The Card title component
 * @param props The props object
 * @param props.children The children to render
 * @returns JSX.Element
 */
export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className='text-center font-cal text-3xl text-strong'>{children}</h3>
  )
}

/**
 * The Card description component
 * @param props The props object
 * @param props.children The children to render
 * @param props.className The class name to apply
 * @returns JSX.Element
 */
export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={cn('text-center text-sub', className)}>{children}</p>
}

/**
 * The Card content component
 * @param props The props object
 * @param props.children The children to render
 * @param props.dir The direction to render the children
 * @returns JSX.Element
 */
export function CardContent({
  children,
  dir = 'cols',
}: {
  children: React.ReactNode
  dir?: 'rows' | 'cols'
}) {
  return (
    <div
      className={cn('grid gap-10', {
        'grid-cols-none md:grid-cols-2': dir === 'cols',
        'grid-rows-none md:grid-rows-2': dir === 'rows',
      })}
    >
      {children}
    </div>
  )
}

/**
 * The Card feature container component
 * @param props The props object
 * @param props.children The children to render
 * @param props.dir The direction to render the children
 * @returns JSX.Element
 */
export function CardFeatureContainer({
  children,
  dir = 'rows',
}: {
  children: React.ReactNode
  dir?: 'rows' | 'cols'
}) {
  return (
    <ul
      className={cn('gap-4 md:gap-6', {
        'grid md:grid-cols-3': dir === 'cols',
        'flex flex-col': dir === 'rows',
      })}
    >
      {children}
    </ul>
  )
}

// TODO: rename type a bit appropriately
/**
 * The Card feature component
 * @param props The props object
 * @returns JSX.Element
 */
export function CardFeature(props: FeatureDescription) {
  const FeatureIcon = Icons[props.icon as ValidIcon]
  return (
    <li>
      <div className='grid gap-1'>
        <p className='flex items-center gap-2'>
          <FeatureIcon className='h-4 w-4 text-sub' />
          <span className='font-medium text-strong'>
            {props.catchline.replace('.', '')}
          </span>{' '}
        </p>
        <span className='text-sub'>{props.description}</span>
      </div>
      {props.badge ? (
        <Badge variant={'outline'} className='-ml-2 mt-1'>
          {props.badge}
        </Badge>
      ) : null}
    </li>
  )
}
