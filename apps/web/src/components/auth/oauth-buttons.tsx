import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@buildit/ui/button'

/**
 * The Oauth component, which will allow the user to sign in with GitHub or Google.
 * @returns JSX.Element
 */
export function OauthButton(): JSX.Element {
  return (
    <div className='flex flex-col gap-2'>
      <Link href={'/login/google'}>
        <Button
          variant={'secondary'}
          className='flex w-full items-center space-x-2'
        >
          <>
            <Image src={'/google.svg'} width={18} height={18} alt='Google' />
          </>
          <p>Continue with Google</p>
        </Button>
      </Link>
      <Link href={'/login/github'}>
        <Button
          variant={'secondary'}
          className='flex w-full items-center space-x-2'
        >
          <>
            <Image src={'/github.svg'} width={18} height={18} alt='GitHub' />
          </>
          <p>Continue with GitHub</p>
        </Button>
      </Link>
    </div>
  )
}
