import { Button } from '@buildit/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@buildit/ui/dialog'

import ChangePasswordForm from '@/components/forms/change-password-form'
import { Icons } from '@/components/ui/icons'

/**
 * This component is used to display the change user's email in a dialog.
 * @returns The change email component.
 */
export default function ChangePassword(): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'secondary'} size={'sm'} className='font-normal'>
          Change password
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-hidden p-6 lg:w-[350px] sm:rounded-xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col text-center text-sm gap-2'>
            <Icons.shieldCheck className='size-5 mx-auto' />
            <div className='flex flex-col gap-0.5'>
              <h1 className='font-medium'>Change password</h1>
              <p className='text-xs text-sub'>
                Use password of atleast 8 characters long.
              </p>
            </div>
          </div>
          <ChangePasswordForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
