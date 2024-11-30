'use client'

import Editor from '@buildit/editor'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@buildit/ui/breadcrumb'
import { Button } from '@buildit/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@buildit/ui/dialog'
import { Input } from '@buildit/ui/input'

import {
  useAssigneeOptions,
  useProjectOptions,
  useTeamsOptions,
} from '@/configs/filter/filter-settings'
import {
  labelConfig,
  priorityConfig,
  statusConfig,
} from '@/configs/filter/issues-config'

import ComboBoxSelect from '../ui/combo-box-select'
import { Icons } from '../ui/icons'
import LabelsSelect from '../ui/labels-select'
import TeamSelect from '../ui/team-select'

const defaultEditorValue = [
  {
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
]

export const IssueModal = ({ children }: { children: React.ReactNode }) => {
  const teamsOptions = useTeamsOptions()
  const assigneeOptions = useAssigneeOptions()
  const projectOptions = useProjectOptions()

  projectOptions.unshift({
    label: 'No project',
    value: 'no project',
    icon: 'hexagon',
  })

  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent')
  const content = localValue ? JSON.parse(localValue) : defaultEditorValue
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='backdrop-blur bg-weak/20' />
        <DialogContent
          isClose={false}
          className='p-0 max-w-3xl overflow-hidden gap-0'
        >
          <DialogHeader className='space-y-0 border-sub p-3 pb-0'>
            <DialogTitle className='sr-only'>New Issues</DialogTitle>
            <DialogDescription className='sr-only'>
              This dialog is to create a new issue
            </DialogDescription>
            <div className='flex items-center justify-between'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='text-strong'>
                    {teamsOptions.length > 1 ? (
                      <TeamSelect />
                    ) : (
                      <BreadcrumbItem>{teamsOptions[0]?.label}</BreadcrumbItem>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className='text-strong'>
                    New issue
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <DialogClose>
                <Icons.x className='size-4' />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className='p-3 flex flex-col space-y-4'>
            <div className='flex flex-col gap-2'>
              <Input
                className='bg-white border-none shadow-none focus-visible:ring-0 focus:ring-offset-0 p-0 text-base font-semibold'
                placeholder='Issue title'
              />
              <Editor
                content={content}
                onChange={(value) => {
                  localStorage.setItem('editorContent', JSON.stringify(value))
                }}
              />
            </div>
            <div className='flex items-center gap-2 *:w-fit'>
              <ComboBoxSelect property='Status' options={statusConfig} />
              <ComboBoxSelect property='Priority' options={priorityConfig} />
              <ComboBoxSelect property='Assignee' options={assigneeOptions} />
              <LabelsSelect property='Label' options={labelConfig} />
              <ComboBoxSelect property='Project' options={projectOptions} />
            </div>
          </div>
          <DialogFooter className='p-3 border-t-[0.5px]'>
            <Button size={'sm'}>Create issue</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
