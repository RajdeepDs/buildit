import type { UpdateIssueContentPayload } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Editor from '@buildit/editor'
import { Form, FormControl, FormField, FormItem } from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { UpdateIssueContentSchema } from '@buildit/utils/validations'

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

/**
 * The Issue content component. This component displays the content of an issue which includes Title and the Description.
 * @returns JSX.Element
 */
export default function Content(): JSX.Element {
  const form = useForm<UpdateIssueContentPayload>({
    resolver: zodResolver(UpdateIssueContentSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent')
  const content = localValue ? JSON.parse(localValue) : defaultEditorValue
  return (
    <Form {...form}>
      <form action='' className='space-y-2 h-fit w-2/3'>
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
      </form>
    </Form>
  )
}
