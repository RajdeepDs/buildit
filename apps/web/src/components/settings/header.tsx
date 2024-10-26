import { Separator } from '@buildit/ui/separator'

/**
 * Header component for settings page
 * @param props The props object.
 * @param props.title The title of the header.
 * @returns The header component.
 */
export default function SettingsHeader({
  title,
}: {
  title: string
}): JSX.Element {
  return (
    <header className='mt-1'>
      <h1 className='text-sm font-semibold text-surface'>{title}</h1>
      <Separator className='mt-2' />
    </header>
  )
}
