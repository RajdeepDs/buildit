'use client'

import type { ChangePasswordInput } from '@buildit/utils/validations'

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
import { ChangePasswordSchema } from '@buildit/utils/validations'

/**
 * This is a form component that is used to change the user's password.
 * @returns The change password form component.
 */
export default function ChangePasswordForm(): JSX.Element {
  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })
  const onSubmit = (values: ChangePasswordInput) => {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem className='space-y-1 flex flex-col'>
              <FormLabel className='text-xs text-sub'>
                Enter your current password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Current password'
                  className='bg-weak h-8 shadow-none'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem className='space-y-1 flex flex-col'>
              <FormLabel className='text-xs text-sub'>
                Enter a new password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='New password'
                  className='bg-weak h-8 shadow-none'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='space-y-1 flex flex-col'>
              <FormLabel className='text-xs text-sub'>
                Confirm your new password
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='Confirm password'
                  className='bg-weak h-8 shadow-none'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full' size={'sm'}>
          Change password
        </Button>
      </form>
    </Form>
  )
}
