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
                  placeholder='Issue Title'
                  required
                  autoComplete='off'
                  {...field}
                  className='bg-white border-none shadow-none focus-visible:ring-0 focus:ring-offset-0 p-0 text-base'
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
      </form>
    </Form>
  )
}

export default NewIssueForm
