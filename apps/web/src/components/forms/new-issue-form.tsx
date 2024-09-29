import { useState } from 'react'

import type { CreateIssueSchema } from '@buildit/utils/validations'
import type { UseFormReturn } from 'react-hook-form'
import type { z } from 'zod'

import Editor from '@buildit/editor'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'

import { priorityOptions, statusOptions } from '@/configs/filter-settings'

import {
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
} from '../ui/combo-box'
import { Icons } from '../ui/icons'

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
}

const NewIssueForm: React.FC<NewIssueFormProps> = ({ form }) => {
  const [openStatus, setOpenStatus] = useState(false)
  const [openPriority, setOpenPriority] = useState(false)

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
              <FormMessage />
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
        </div>
      </form>
    </Form>
  )
}

export default NewIssueForm
