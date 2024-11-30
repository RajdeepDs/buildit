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
import { toast } from '@buildit/ui/toast'
import { CreateIssueSchema } from '@buildit/utils/validations'

import NewIssueContentForm from '@/components/forms/new-issue-content'
import ComboBoxSelect from '@/components/ui/combo-box-select'
import { Icons } from '@/components/ui/icons'
import LabelsSelect from '@/components/ui/labels-select'
import TeamSelect from '@/components/ui/team-select'
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
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [assignee, setAssignee] = useState('')
  const [project, setProject] = useState('')
  const [labels, setLabels] = useState<string[]>([])
  const teamsOptions = useTeamsOptions()
  const assigneeOptions = useAssigneeOptions()
  const projectOptions = useProjectOptions()
  const [team, setTeam] = useState<string>(teamsOptions[0]?.value ?? '')

  const handleLabelsChange = (selectedValues: string[]) => {
    setLabels(selectedValues)
  }

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
      status: 'todo',
      priority: 'no priority',
      ...defaultValues,
    },
  })

  const onSubmit = (values: CreateIssuePayload) => {
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent

    // createIssue({
    //   title: values.title,
    //   description: descriptionContent,
    //   status: values.status,
    //   priority: values.priority,
    //   assigneeId: values.assigneeId,
    //   projectId: values.projectId,
    //   teamId: teamsOptions[0]?.value ?? '',
    // })
    console.log({
      ...values,
      description: descriptionContent,
      status,
      priority,
      assignee,
      project,
      labels,
      team,
    })

    localStorage.removeItem('editorContent')
    form.reset()
    setOpen(false)
  }

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    const error = errors.title?.message
    if (error) {
      toast({
        title: error,
        description: 'Please enter a title before submitting',
      })
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogOverlay className='backdrop-blur bg-weak/20' />
        <DialogContent
          isClose={false}
          className='p-0 max-w-3xl overflow-hidden gap-0 top-[30%]'
        >
          <DialogHeader className='space-y-0 border-sub p-3 pb-0'>
            <DialogTitle className='sr-only'>New Issues</DialogTitle>
            <DialogDescription className='sr-only'>
              This dialog is to create a new issue.
            </DialogDescription>
            <div className='flex items-center justify-between'>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='text-strong'>
                    {teamsOptions.length > 1 ? (
                      <TeamSelect onChange={setTeam} />
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
          <div className='p-3 flex flex-col space-y-4'>
            <NewIssueContentForm form={form} />
            <div className='flex items-center gap-2 *:w-fit'>
              <ComboBoxSelect
                property='Status'
                options={statusConfig}
                onChange={setStatus}
              />
              <ComboBoxSelect
                property='Priority'
                options={priorityConfig}
                onChange={setPriority}
              />
              <ComboBoxSelect
                property='Assignee'
                options={assigneeOptions}
                onChange={setAssignee}
              />
              <ComboBoxSelect
                property='Project'
                options={projectOptions}
                onChange={setProject}
              />
              <LabelsSelect
                property='Label'
                options={labelConfig}
                onChange={handleLabelsChange}
              />
            </div>
          </div>
          <DialogFooter className='p-3 border-t-[0.5px]'>
            <Button size={'sm'} onClick={handleSubmit}>
              Create issue
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
