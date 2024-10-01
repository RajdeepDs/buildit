'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Editor from '@buildit/editor'
import { Button } from '@buildit/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'

// Define the form schema using Zod
const formSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
})

/**
 * The Editor Page
 * @returns The Editor Page component
 */
export default function EditorPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Fetch the latest editor content from localStorage
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent ? JSON.parse(localContent) : null

    console.log('Submitted Values:', {
      ...values,
      description: descriptionContent,
    })
    localStorage.removeItem('editorContent')
  }

  // Default content for the editor
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

  // Check if there's saved content in localStorage
  const localValue =
    typeof window !== 'undefined' && localStorage.getItem('editorContent')

  // Use localStorage value or fallback to the default content
  const content = localValue ? JSON.parse(localValue) : defaultEditorValue

  return (
    <div className='p-5'>
      <h1 className='text-xl mb-5'>Editor Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Title'
                    required
                    autoComplete='off'
                    {...field}
                    className='bg-white border-none shadow-none focus-visible:ring-0 focus:ring-offset-0 px-0'
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
                      localStorage.setItem(
                        'editorContent',
                        JSON.stringify(value),
                      )
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
