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
  FormMessage,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { toast } from '@buildit/ui/toast'
import { ChangePasswordSchema } from '@buildit/utils/validations'

import { api } from '@/lib/trpc/react'

/**
 * This is a form component that is used to change the user's password.
 * @param props The props object.
 * @param props.isPassword The boolean value to check if the user has password.
 * @returns The change password form component.
 */
export default function ChangePasswordForm({
  isPassword,
}: {
  isPassword: boolean
}): JSX.Element {
  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(ChangePasswordSchema(isPassword)),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const mutations = api.settings.update_password.useMutation({
    onSuccess: ({ message }) => {
      toast({
        title: 'Updated!',
        description: message,
      })
      form.reset()
    },
    onError: ({ message }) => {
      toast({
        title: 'Error!',
        description: message,
        variant: 'destructive',
      })
      form.reset()
    },
  })
  const onSubmit = (values: ChangePasswordInput) => {
    mutations.mutate(values)
  }
  return (
    <Form {...form}>
      <form className='space-y-3' onSubmit={form.handleSubmit(onSubmit)}>
        {isPassword && (
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
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' size={'sm'} disabled={mutations.isPending}>
          Change password
        </Button>
      </form>
    </Form>
  )
}
