import type { CreateIssueSchema } from '@buildit/utils/validations'
import type React from 'react'
import type { z } from 'zod'

import { type UseFormReturn } from 'react-hook-form'

import Editor from '@buildit/editor'
import { Form, FormControl, FormField, FormItem } from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'

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
interface NewIssueContentFormProps {
  form: UseFormReturn<z.infer<typeof CreateIssueSchema>>
}

const NewIssueContentForm: React.FC<NewIssueContentFormProps> = ({ form }) => {
  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent')
  const content = localValue ? JSON.parse(localValue) : defaultEditorValue
  return (
    <>
      <Form {...form}>
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
                  content={content as typeof defaultEditorValue}
                  onChange={(value) => {
                    localStorage.setItem('editorContent', JSON.stringify(value))
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </>
  )
}

export default NewIssueContentForm
