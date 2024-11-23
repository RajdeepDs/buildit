import { useState } from 'react'

import type { TTeam } from '@buildit/utils/types'
import type { CreateProjectPayload } from '@buildit/utils/validations'
import type React from 'react'
import type { UseFormReturn } from 'react-hook-form'

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
import { priorityConfig, statusConfig } from '@/configs/filter/projects-config'

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

interface NewProjectFormProps {
  form: UseFormReturn<CreateProjectPayload>
  team: Pick<TTeam, 'user' | 'name' | 'teamId'>
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({ form, team }) => {
  const [openStatus, setOpenStatus] = useState(false)
  const [openPriority, setOpenPriority] = useState(false)
  const [openLead, setOpenLead] = useState(false)

  const lead = team.user

  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent')
  const content = localValue ? JSON.parse(localValue) : defaultEditorValue

  return (
    <Form {...form}>
      <form className='space-y-2'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className='bg-white border-none shadow-none focus-visible:ring-0 focus:ring-offset-0 p-0 text-base'
                  placeholder='Project name'
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
              const currentStatus = statusConfig.find(
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
                    {statusConfig.map((status) => {
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
              const currentPriority = priorityConfig.find(
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
                    {priorityConfig.map((priority) => {
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
            name='leadId'
            control={form.control}
            render={({ field }) => {
              return (
                <ComboBox open={openLead} onOpenChange={setOpenLead}>
                  <ComboBoxTrigger>
                    {field.value ? (
                      lead && (
                        <div className='flex items-center'>
                          <Avatar className='size-4 mr-2'>
                            <AvatarImage
                              src={lead.image ?? ''}
                              alt={lead.name ?? ''}
                            />
                            <AvatarFallback>
                              {lead.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <p className='text-sm'>{lead.name}</p>
                        </div>
                      )
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <Icons.userCircle2 className='h-4 w-4 text-soft' />
                        <p>No Lead</p>
                      </div>
                    )}
                  </ComboBoxTrigger>
                  <ComboBoxContent placeholder='Set project lead to...'>
                    <ComboBoxItem
                      key='unassigned'
                      value='unassigned'
                      onSelect={() => {
                        field.onChange('')
                        setOpenLead(false)
                      }}
                    >
                      <Icons.userCircle2 className='mr-2 h-4 w-4 text-soft' />
                      No Lead
                    </ComboBoxItem>
                    {lead && (
                      <ComboBoxItem
                        key={lead.id}
                        value={lead.id}
                        onSelect={() => {
                          field.onChange(lead.id)
                          setOpenLead(false)
                        }}
                      >
                        <Avatar className='size-4 mr-2'>
                          <AvatarImage
                            src={lead.image ?? ''}
                            alt={lead.name ?? ''}
                          />
                          <AvatarFallback>
                            {lead.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {lead.name}
                      </ComboBoxItem>
                    )}
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

export default NewProjectForm
