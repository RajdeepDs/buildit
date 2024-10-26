import { Button } from '@buildit/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@buildit/ui/dialog'

import InviteMemberForm from '@/components/forms/invite-member-form'
import { Icons } from '@/components/ui/icons'

/**
 * This component is used to display the invite member in a dialog.
 * @returns The invite member component.
 */
export default function InviteMember(): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'}>Invite member</Button>
      </DialogTrigger>
      <DialogContent
        isClose={false}
        className='overflow-hidden p-6 lg:w-[350px] sm:rounded-xl'
      >
        <DialogTitle className='sr-only'>Invite member</DialogTitle>
        <DialogDescription className='sr-only'>
          Dialog to invite member with email
        </DialogDescription>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col text-center text-sm gap-2'>
            <Icons.userRoundPlus className='size-5 mx-auto' />
            <div className='flex flex-col gap-0.5'>
              <h1 className='font-medium'>Invite member</h1>
              <p className='text-xs text-sub'>
                Invite member to your workspace.
              </p>
            </div>
          </div>
          <InviteMemberForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
