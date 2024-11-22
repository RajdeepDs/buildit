import type { UpdateIssueContentPayload } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Editor from '@buildit/editor'
import { Form, FormControl, FormField, FormItem } from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { toast } from '@buildit/ui/toast'
import { UpdateIssueContentSchema } from '@buildit/utils/validations'

import { api } from '@/lib/trpc/react'

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

interface ContentProps {
  id: string | undefined
  title: string | undefined
  description: unknown | undefined
}

/**
 * The Issue content component. This component displays the content of an issue which includes Title and the Description.
 * @param props The props for the Content component.
 * @param props.id The id of the issue.
 * @param props.title The title of the issue.
 * @param props.description The description of the issue.
 * @returns JSX.Element
 */
export default function Content({
  id,
  title,
  description,
}: ContentProps): JSX.Element {
  const form = useForm<UpdateIssueContentPayload>({
    resolver: zodResolver(UpdateIssueContentSchema),
    defaultValues: {
      title,
      description: description as string,
    },
  })

  const content = description
    ? JSON.parse(description as string)
    : defaultEditorValue

  const mutation = api.issues.update_issue_content.useMutation({
    onSuccess: ({ message }) => {
      toast({
        description: message,
        variant: 'default',
      })
    },
    onError: ({ message }) => {
      toast({
        description: message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit = (data: Partial<UpdateIssueContentPayload>) => {
    console.log('Submitted Values:', data)
    mutation.mutate({
      id: id!,
      ...data,
    })
  }

  const handleBlur = (field: keyof UpdateIssueContentPayload) => {
    const currentValues = form.getValues()
    const initialValues = form.formState.defaultValues ?? {}

    if (field === 'description') {
      const localContent = localStorage.getItem('editorContent')
      const descriptionContent = localContent
        ? (JSON.parse(localContent) as string)
        : null

      if (JSON.stringify(descriptionContent) !== initialValues.description) {
        onSubmit({ description: JSON.stringify(descriptionContent) })
        localStorage.removeItem('editorContent')
      }
    } else if (currentValues[field] !== initialValues[field]) {
      onSubmit({ [field]: currentValues[field] })
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-2 h-fit w-2/3'>
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
                  onBlur={() => {
                    handleBlur('title')
                  }}
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
                  onBlur={() => {
                    handleBlur('description')
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
