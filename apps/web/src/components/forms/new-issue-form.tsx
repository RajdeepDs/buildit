import { useState } from 'react'

import type { TProject, TTeam } from '@buildit/utils/types'
import type { CreateIssueSchema } from '@buildit/utils/validations'
import type { UseFormReturn } from 'react-hook-form'
import type { z } from 'zod'

import Editor from '@buildit/editor'
import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Form, FormControl, FormField, FormItem } from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'

import {
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
} from '@/components/ui/combo-box'
import { Icons } from '@/components/ui/icons'
import { priorityOptions, statusOptions } from '@/configs/filter-settings'

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

interface NewIssueFormProps {
  form: UseFormReturn<z.infer<typeof CreateIssueSchema>>
  team: Pick<TTeam, 'user' | 'name' | 'teamId'>
  projects: Pick<TProject, 'id' | 'name'>[]
}

const NewIssueForm: React.FC<NewIssueFormProps> = ({
  form,
  team,
  projects,
}) => {
  const [openStatus, setOpenStatus] = useState(false)
  const [openPriority, setOpenPriority] = useState(false)
  const [openAssignee, setOpenAssignee] = useState(false)
  const [openProject, setOpenProject] = useState(false)

  const assignee = team.user

  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent')
  const content = localValue ? JSON.parse(localValue) : defaultEditorValue

  return (
    <Form {...form}>
      <form className='space-y-2'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='bg-white border-none shadow-none focus-visible:ring-0 focus:ring-offset-0 p-0 text-base'
                  placeholder='Issue Title'
                  autoComplete='off'
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name='description'
          control={form.control}
          render={() => (
            <FormItem>
              <FormControl>
                <Editor
                  content={content}
                  onChange={(value) => {
                    localStorage.setItem('editorContent', JSON.stringify(value))
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex items-center gap-2'>
          <FormField
            name='status'
            control={form.control}
            render={({ field }) => {
              const currentStatus = statusOptions.find(
                (status) => status.value === field.value,
              )
              const CurrentStatusIcon =
                Icons[currentStatus?.icon as keyof typeof Icons]
              return (
                <ComboBox open={openStatus} onOpenChange={setOpenStatus}>
                  <ComboBoxTrigger>
                    <CurrentStatusIcon className='size-4 mr-1 text-sub' />
                    {currentStatus?.label}
                  </ComboBoxTrigger>
                  <ComboBoxContent placeholder='Change status...'>
                    {statusOptions.map((status) => {
                      const Icon = Icons[status.icon as keyof typeof Icons]
                      return (
                        <ComboBoxItem
                          key={status.value}
                          value={status.value}
                          onSelect={() => {
                            field.onChange(status.value)
                            setOpenStatus(false)
                          }}
                        >
                          <Icon className='mr-2 h-4 w-4 text-soft' />
                          {status.label}
                        </ComboBoxItem>
                      )
                    })}
                  </ComboBoxContent>
                </ComboBox>
              )
            }}
          />
          <FormField
            name='priority'
            control={form.control}
            render={({ field }) => {
              const currentPriority = priorityOptions.find(
                (priority) => priority.value === field.value,
              )
              const CurrentStatusIcon =
                Icons[currentPriority?.icon as keyof typeof Icons]
              return (
                <ComboBox open={openPriority} onOpenChange={setOpenPriority}>
                  <ComboBoxTrigger>
                    <CurrentStatusIcon className='size-4 mr-1 text-sub' />
                    {currentPriority?.label}
                  </ComboBoxTrigger>
                  <ComboBoxContent placeholder='Change priority...'>
                    {priorityOptions.map((priority) => {
                      const Icon = Icons[priority.icon as keyof typeof Icons]
                      return (
                        <ComboBoxItem
                          key={priority.value}
                          value={priority.value}
                          onSelect={() => {
                            field.onChange(priority.value)
                            setOpenPriority(false)
                          }}
                        >
                          <Icon className='mr-2 h-4 w-4 text-soft' />
                          {priority.label}
                        </ComboBoxItem>
                      )
                    })}
                  </ComboBoxContent>
                </ComboBox>
              )
            }}
          />
          <FormField
            name='assigneeId'
            control={form.control}
            render={({ field }) => {
              return (
                <ComboBox open={openAssignee} onOpenChange={setOpenAssignee}>
                  <ComboBoxTrigger>
                    {field.value ? (
                      assignee && (
                        <div className='flex items-center'>
                          <Avatar className='size-4 mr-2'>
                            <AvatarImage
                              src={assignee.image ?? ''}
                              alt={assignee.name ?? ''}
                            />
                            <AvatarFallback>
                              {assignee.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <p className='text-sm'>{assignee.name}</p>
                        </div>
                      )
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <Icons.userCircle2 className='h-4 w-4 text-soft' />
                        <p>No assignee</p>
                      </div>
                    )}
                  </ComboBoxTrigger>
                  <ComboBoxContent placeholder='Assign to...'>
                    <ComboBoxItem
                      key='unassigned'
                      value='unassigned'
                      onSelect={() => {
                        field.onChange('')
                        setOpenAssignee(false)
                      }}
                    >
                      <Icons.userCircle2 className='mr-2 h-4 w-4 text-soft' />
                      No assignee
                    </ComboBoxItem>
                    {assignee && (
                      <ComboBoxItem
                        key={assignee.id}
                        value={assignee.id}
                        onSelect={() => {
                          field.onChange(assignee.id)
                          setOpenAssignee(false)
                        }}
                      >
                        <Avatar className='size-4 mr-2'>
                          <AvatarImage
                            src={assignee.image ?? ''}
                            alt={assignee.name ?? ''}
                          />
                          <AvatarFallback>
                            {assignee.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {assignee.name}
                      </ComboBoxItem>
                    )}
                  </ComboBoxContent>
                </ComboBox>
              )
            }}
          />
          <FormField
            name='projectId'
            control={form.control}
            render={({ field }) => {
              return (
                <ComboBox open={openProject} onOpenChange={setOpenProject}>
                  <ComboBoxTrigger>
                    {field.value ? (
                      <div className='flex items-center'>
                        <Icons.hexagon className='mr-2 h-4 w-4 text-soft' />
                        {
                          projects.find((project) => project.id === field.value)
                            ?.name
                        }
                      </div>
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <Icons.hexagon className='h-4 w-4 text-soft' />
                        <p>No Project</p>
                      </div>
                    )}
                  </ComboBoxTrigger>
                  <ComboBoxContent placeholder='Assign to...'>
                    <ComboBoxItem
                      key='no project'
                      value='no project'
                      onSelect={() => {
                        field.onChange('')
                        setOpenProject(false)
                      }}
                    >
                      <Icons.hexagon className='mr-2 h-4 w-4 text-soft' />
                      No Project
                    </ComboBoxItem>
                    {projects.map((project) => (
                      <ComboBoxItem
                        key={project.id}
                        value={project.id}
                        onSelect={() => {
                          field.onChange(project.id)
                          setOpenProject(false)
                        }}
                      >
                        <Icons.hexagon className='mr-2 h-4 w-4 text-soft' />
                        {project.name}
                      </ComboBoxItem>
                    ))}
                  </ComboBoxContent>
                </ComboBox>
              )
            }}
          />
        </div>
      </form>
    </Form>
  )
}

export default NewIssueForm
