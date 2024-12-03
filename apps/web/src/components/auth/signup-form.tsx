'use client'

import { useTransition } from 'react'
import { redirect } from 'next/navigation'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { signup } from '@buildit/auth/actions/signup'
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
import { sonner } from '@buildit/ui/sonner'
import { SignUpSchema } from '@buildit/utils/validations'

import ErrorNotification from '@/components/ui/toast/error'
import SettingsSuccessNotification from '@/components/ui/toast/settings-success'

/**
 * The sign-up form component, which will allow the user to sign-up with their email and password.
 * @returns JSX.Element
 */
export default function SignUpForm(): JSX.Element {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    startTransition(async () => {
      const { error, success } = await signup(null, values)
      if (success) {
        sonner.custom((t) => (
          <SettingsSuccessNotification
            t={t}
            title='Thank you for signing up!'
            description='Please verify your email to complete the sign-up process.'
          />
        ))

        redirect('/verify-email')
      }
      if (error) {
        sonner.custom((t) => <ErrorNotification t={t} />)
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className='mt-6 w-[296px] space-y-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sub'>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter password'
                  {...field}
                  className='bg-white'
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sub'>Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Confirm your password'
                  {...field}
                  className='bg-white'
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type='submit' className='w-full' disabled={isPending}>
          Create account
        </Button>
      </form>
    </Form>
  )
}
