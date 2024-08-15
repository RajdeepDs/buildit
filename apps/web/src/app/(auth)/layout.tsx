import Image from 'next/image'
import Link from 'next/link'

import type { ReactNode } from 'react'

/**
 * The login page of the application, if the user is already logged in they will be redirected to the home page.
 * @param props The props to the layout, which will be every page in this application.
 * @param props.children The children, which is the page the user is currently on.
 * @returns The layout of the application.
 */
export default function AuthLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <div className='container mx-auto flex h-dvh flex-col'>
      <nav className='flex py-4'>
        <Link href={'/'}>
          <Image src={'/buildit-logo.svg'} width={30} height={30} alt='Logo' />
        </Link>
      </nav>
      <main className='mx-auto mt-32 flex w-full flex-1 justify-center'>
        {children}
      </main>
    </div>
  )
}
