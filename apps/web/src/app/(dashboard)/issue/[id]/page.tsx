import { Sidebar } from '@buildit/ui/sidebar'

import Header from '@/components/layout/header'

/**
 * The IssuePage component is the page that displays the details of a specific issue.
 * @param props The props for the IssuePage component.
 * @param props.params The params for the IssuePage component.
 * @param props.params.id The ID of the issue.
 * @returns JSX.Element
 */
export default function IssuePage({
  params,
}: {
  params: { id: string }
}): JSX.Element {
  return (
    <div className='h-full flex w-full gap-2'>
      <div className='h-full flex flex-col flex-grow'>
        <Header />
        <main className='bg-white'></main>
      </div>
      <Sidebar
        collapsible='none'
        className='sticky hidden lg:flex top-0 h-full border bg-weak rounded-md'
      >
        {/* Sidebar content */}
      </Sidebar>
    </div>
  )
}
