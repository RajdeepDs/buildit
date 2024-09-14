'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Editor from '@buildit/editor'
import { Form, FormControl, FormField, FormItem } from '@buildit/ui/form'

const formSchema = z.object({
  description: z.string().nullable(),
})

/**
 * The Editor Page
 * @returns The Editor Page
 */
export default function EditorPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Submitted Values:', values) // TODO: Implement the submit logic
  }

  const defaultValue = JSON.stringify([{ children: [{ text: '' }], type: 'p' }])

  const value = JSON.parse(
    localStorage.getItem('editorContent') ?? defaultValue,
  )

  return (
    <div className='p-5'>
      <h1 className='text-xl mb-5'>Editor Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='description'
            control={form.control}
            render={() => (
              <FormItem>
                <FormControl>
                  <Editor
                    content={value}
                    onBlur={() => {
                      void form.trigger('description')
                      if (form.formState.isValid) {
                        if (typeof window !== 'undefined') {
                          onSubmit({
                            description: localStorage.getItem('editorContent'),
                          })
                        }
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
