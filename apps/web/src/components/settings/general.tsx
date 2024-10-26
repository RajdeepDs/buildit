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
import { Separator } from '@buildit/ui/separator'

import WorkspaceForm from '@/components/forms/workspace-form'
import SubHeader from '@/components/settings/sub-header'
import { Icons } from '@/components/ui/icons'
import { api } from '@/lib/trpc/react'

/**
 * The workspace settings component. This component is used to display the workspace settings.
 * @returns The workspace settings component.
 */
export default function WorkspaceGeneral(): JSX.Element {
  const { data: workspace } = api.workspace.get_workspace.useQuery()

  if (!workspace) {
    return <>Loading...</>
  }

  return (
    <div className='flex flex-col space-y-4 items-start'>
      <WorkspaceForm workspace_name={workspace.name} />
      <Separator />
      <SubHeader
        title='Delete workspace'
        description={`If you want to permanently delete your workspace and all of it's data, you can do so here.`}
      />
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            variant={'destructive'}
            size={'sm'}
            className='bg-error-lighter border-error text-error'
          >
            Delete this workspace
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='overflow-hidden p-6 lg:w-[450px] sm:rounded-xl'>
          <AlertDialogTitle className='sr-only'>Delete</AlertDialogTitle>
          <AlertDialogDescription className='sr-only'>
            Delete this workspace
          </AlertDialogDescription>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col text-center text-sm gap-2'>
              <Icons.triangleAlert className='size-5 mx-auto text-error' />
              <div className='flex flex-col gap-0.5'>
                <h1 className='font-medium'>
                  Delete this entire workspace permanently?
                </h1>
                <p className='text-sm text-sub'>
                  This action cannot be undone. This will permanently delete the
                  workspace, including all pages and files.
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <AlertDialogAction className='w-full bg-error-lighter text-error border-error'>
                Permanently delete workspace
              </AlertDialogAction>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
