'use client'

import { useState } from 'react'

import type { CreateProjectPayload } from '@buildit/utils/validations'

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
import { CreateProjectSchema } from '@buildit/utils/validations'

import NewProjectContentForm from '@/components/forms/new-project-content'
import ComboBoxSelect from '@/components/ui/combo-box-select'
import { Icons } from '@/components/ui/icons'
import TeamSelect from '@/components/ui/team-select'
import WarningNotification from '@/components/ui/toast/warning'
import {
  useLeadOptions,
  useTeamsOptions,
} from '@/configs/filter/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/filter/projects-config'
import { useCreateProject } from '@/hooks/mutations/use-create-project'

export const ProjectModal = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode
  defaultValues?: Partial<CreateProjectPayload>
}) => {
  const [open, setOpen] = useState(false)
  const teamsOptions = useTeamsOptions()
  const leadOptions = useLeadOptions()
  const [team, setTeam] = useState<string>(teamsOptions[0]?.value ?? '')

  const { mutate: createProject } = useCreateProject()

  const form = useForm<CreateProjectPayload>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'backlog',
      priority: 'no priority',
      leadId: '',
      ...defaultValues,
    },
  })

  const onSubmit = (values: CreateProjectPayload) => {
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent

    createProject({
      ...values,
      description: descriptionContent,
      teamId: team,
    })

    localStorage.removeItem('editorContent')
    form.reset()
    setOpen(false)
  }

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    const error = errors.name?.message
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
            <DialogTitle className='sr-only'>New Project</DialogTitle>
            <DialogDescription className='sr-only'>
              Create a new project with detailed properties.
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
                    New Project
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
              <NewProjectContentForm form={form} />
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
                  name='leadId'
                  control={form.control}
                  render={({ field }) => (
                    <ComboBoxSelect
                      property='Lead'
                      options={leadOptions}
                      field={field}
                    />
                  )}
                />
              </div>
            </form>
          </div>
          <DialogFooter className='p-3 border-t-[0.5px]'>
            <Button size='sm' type='submit' onClick={handleSubmit}>
              Create project
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
