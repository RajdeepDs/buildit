'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Editor from '@buildit/editor'

const formSchema = z.object({
  description: z.any(),
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
    console.log('values:', values) // TODO: Implement the submit logic
  }
  return (
    <div className='p-5'>
      <h1 className='text-xl mb-5'>Editor Page</h1>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name='description'
            control={form.control}
            render={() => (
              <FormItem>
                <FormControl>
                  <BlockEditor
                    name='description'
                    control={form.control}
                    onBlur={() => {
                      void form.trigger('description')
                      if (form.formState.isValid) {
                        onSubmit(form.getValues())
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form> */}

      <Editor />
    </div>
  )
}
