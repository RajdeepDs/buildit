import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { CreateIssueSchema } from '@buildit/utils/validations'

/**
 * The new issue form. This is the form that is used to create a new issue.
 * @param props The props.
 * @param props.onOpenChange The function to change the open state of the modal.
 * @param props.team The team.
 * @returns The new issue form.
 */
export default function NewIssueForm(): JSX.Element {
  const form = useForm<z.infer<typeof CreateIssueSchema>>({
    resolver: zodResolver(CreateIssueSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = (values: z.infer<typeof CreateIssueSchema>) => {
    console.log('Submitted Values:', values) // TODO: Implement the submit logic
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
        </form>
      </Form>
    </div>
  )
}
