'use client'

import { useState } from 'react'

import type { CreateIssuePayload } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { FormField } from '@buildit/ui/form'
import { sonner } from '@buildit/ui/sonner'
import { CreateIssueSchema } from '@buildit/utils/validations'

import NewIssueContentForm from '@/components/forms/new-issue-content'
import ComboBoxSelect from '@/components/ui/combo-box-select'
import { Icons } from '@/components/ui/icons'
import LabelsSelect from '@/components/ui/labels-select'
import TeamSelect from '@/components/ui/team-select'
import WarningNotification from '@/components/ui/toast/warning'
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
import { useCreateIssue } from '@/hooks/mutations/use-create-issue'

export const IssueModal = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode
  defaultValues?: Partial<CreateIssuePayload>
}) => {
  console.log(defaultValues)

  const [open, setOpen] = useState(false)
  const teamsOptions = useTeamsOptions()
  const assigneeOptions = useAssigneeOptions()
  const projectOptions = useProjectOptions()
  const [team, setTeam] = useState<string>(teamsOptions[0]?.value ?? '')

  const { mutate: createIssue } = useCreateIssue()

  projectOptions.unshift({
    label: 'No project',
    value: 'no project',
    icon: 'hexagon',
  })

  const form = useForm<CreateIssuePayload>({
    resolver: zodResolver(CreateIssueSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'backlog',
      priority: 'no priority',
      labels: [],
      assigneeId: '',
      projectId: '',
      ...defaultValues,
    },
  })

  const onSubmit = (values: CreateIssuePayload) => {
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent

    createIssue({
      ...values,
      teamId: team,
      description: descriptionContent,
    })

    localStorage.removeItem('editorContent')
    form.reset()
    setOpen(false)
  }

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    const error = errors.title?.message
    if (error) {
      sonner.custom((t) => <WarningNotification t={t} message={error} />)
    }
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) {
          form.reset()
          localStorage.removeItem('editorContent')
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='backdrop-blur bg-weak/20' />
        <DialogContent
          isClose={false}
          className='p-0 max-w-3xl overflow-hidden gap-0 top-[30%]'
        >
          <DialogHeader className='space-y-0 border-sub p-3 pb-0'>
            <DialogTitle className='sr-only'>New Issue</DialogTitle>
            <DialogDescription className='sr-only'>
              Create a new issue with detailed properties.
            </DialogDescription>
            <div className='flex items-center justify-between'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='text-strong'>
                    {teamsOptions.length > 1 ? (
                      <TeamSelect
                        onChange={(value) => {
                          setTeam(value)
                        }}
                      />
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
                <Icons.x className='size-4 text-sub' />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className='p-3 flex flex-col'>
            <form onSubmit={handleSubmit}>
              <NewIssueContentForm form={form} />
              <div className='flex items-center gap-2 mt-4 *:w-fit'>
                <FormField
                  name='status'
                  control={form.control}
                  render={({ field }) => (
                    <ComboBoxSelect
                      property='Status'
                      options={statusConfig}
                      field={field}
                    />
                  )}
                />
                <FormField
                  name='priority'
                  control={form.control}
                  render={({ field }) => (
                    <ComboBoxSelect
                      property='Priority'
                      options={priorityConfig}
                      field={field}
                    />
                  )}
                />
                <FormField
                  name='assigneeId'
                  control={form.control}
                  render={({ field }) => (
                    <ComboBoxSelect
                      property='Assignee'
                      options={assigneeOptions}
                      field={field}
                    />
                  )}
                />
                <FormField
                  name='projectId'
                  control={form.control}
                  render={({ field }) => (
                    <ComboBoxSelect
                      property='Project'
                      options={projectOptions}
                      field={field}
                    />
                  )}
                />
                <LabelsSelect
                  property='Label'
                  options={labelConfig}
                  onChange={(value) => {
                    form.setValue(
                      'labels',
                      value as ('bug' | 'feature' | 'enhancement')[],
                    )
                  }}
                />
              </div>
            </form>
          </div>
          <DialogFooter className='p-3 border-t-[0.5px]'>
            <Button size='sm' type='submit' onClick={handleSubmit}>
              Create Issue
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
