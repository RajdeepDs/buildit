'use client'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@buildit/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { useToast } from '@buildit/ui/toast'
import { JoinWaitlistSchema } from '@buildit/utils/validations'

import { api } from '@/lib/trpc/react'

/**
 * The waitlist form component, which will allow the user to join the waitlist to get early access of BuildIt.
 * @returns JSX.Element
 */
export default function WaitlistForm(): JSX.Element {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof JoinWaitlistSchema>>({
    resolver: zodResolver(JoinWaitlistSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const mutation = api.join.join_waitlist.useMutation({
    onSuccess({ message }) {
      toast({
        title: 'Thank you for joining the waitlist!',
        description: message,
      })
    },
    onError({ message }) {
      toast({
        title: 'Something went wrong!',
        description: message,
      })
    },
  })

  const onSubmit = (values: z.infer<typeof JoinWaitlistSchema>) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-6 w-[296px] space-y-4'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sub'>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} className='bg-white' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sub'>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='onboarding@example.com'
                  {...field}
                  className='bg-white'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={mutation.isPending}>
          Join Waitlist!
        </Button>
      </form>
    </Form>
  )
}
