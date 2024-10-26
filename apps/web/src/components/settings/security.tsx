'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@buildit/ui/alert-dialog'
import { Button } from '@buildit/ui/button'
import { toast } from '@buildit/ui/toast'

import SubHeader from '@/components/settings/sub-header'
import { Icons } from '@/components/ui/icons'
import { api } from '@/lib/trpc/react'

/**
 * The security component. This component is used to display the user's security.
 * @returns The security component.
 */
export default function Security(): JSX.Element {
  const mutation = api.settings.logout_all_devices.useMutation({
    onSuccess: ({ message }) => {
      toast({
        title: 'Success!',
        description: message,
      })
    },
  })

  const handleLogoutAllDevices = () => {
    mutation.mutate()
  }
  return (
    <div className='flex flex-col space-y-4'>
      <SubHeader
        title='Log out of all devices'
        description='Log out of all other active sessions on other devices besides this one.'
      >
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={'secondary'} size={'sm'} className='font-normal'>
              Log out of all devices
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='overflow-hidden p-6 lg:w-[400px] sm:rounded-xl'>
            <AlertDialogTitle className='sr-only'>Log out</AlertDialogTitle>
            <AlertDialogDescription className='sr-only'>
              Log out of all devices
            </AlertDialogDescription>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col text-center text-sm gap-2'>
                <Icons.triangleAlert className='size-5 mx-auto' />
                <div className='flex flex-col gap-0.5'>
                  <h1 className='font-medium'>Log out of all devices?</h1>
                  <p className='text-sm text-sub'>
                    You will be logged out of all other active sessions on other
                    devices except this one.
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <AlertDialogAction
                  className='w-full bg-error-lighter text-error border-error'
                  onClick={() => {
                    handleLogoutAllDevices()
                  }}
                >
                  Log out
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </SubHeader>
      {/* Todo: Add Active Sessions component */}
    </div>
  )
}
