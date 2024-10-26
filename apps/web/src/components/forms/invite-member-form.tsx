'use client'

import type { InviteMemberInput } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@buildit/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { InviteMemberSchema } from '@buildit/utils/validations'

/**
 * The invite member form component. This component is used to invite a member.
 * @returns The invite member form component.
 */
export default function InviteMemberForm(): JSX.Element {
  const form = useForm<InviteMemberInput>({
    resolver: zodResolver(InviteMemberSchema),
    defaultValues: {
      email: '',
    },
  })
  const onSubmit = (values: InviteMemberInput) => {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-1 flex flex-col'>
              <FormLabel className='text-xs text-sub'>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='email@example.com'
                  className='bg-weak h-8 shadow-none'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size={'sm'} className='w-full'>
          Send invite
        </Button>
      </form>
    </Form>
  )
}
