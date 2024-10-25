import { Button } from '@buildit/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@buildit/ui/dialog'
import { Label } from '@buildit/ui/label'

import ChangeEmailForm from '@/components/forms/change-email-form'

/**
 * This component is used to display the change user's email in a dialog.
 * @param props The props object.
 * @param props.email The email of the user.
 * @returns The change email component.
 */
export default function ChangeEmail({
  email,
}: {
  email: string | undefined
}): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'secondary'} size={'sm'} className='font-normal'>
          Change email
        </Button>
      </DialogTrigger>
      <DialogContent
        isClose={false}
        className='overflow-hidden p-6 sm:rounded-xl'
      >
        <div className='flex flex-col'>
          <Label className='font-normal text-sm'>
            Your current email is{' '}
            <span className='font-semibold '>{email}.</span>
          </Label>
          <ChangeEmailForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
