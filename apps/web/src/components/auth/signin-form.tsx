'use client'

import { useTransition } from 'react'
import Link from 'next/link'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { login } from '@buildit/auth/actions/login'
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
import { SignInSchema } from '@buildit/utils/validations'

/**
 * The sign-in form component, which will allow the user to sign-in with their email and password.
 * @returns JSX.Element
 */
export default function SignInForm(): JSX.Element {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      const { error, success } = await login(null, values)
      if (success) {
        toast({
          title: "You're signed in!",
          description: 'Welcome back!',
        })
      }
      if (error) {
        toast({
          title: "Couldn't log in!",
          description: error,
        })
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-6 w-[296px] space-y-4'
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
              <div className='flex items-center w-full justify-between'>
                <FormLabel className='text-sub'>Password</FormLabel>
                <Link
                  href={'/forgot-password'}
                  className='text-xs text-soft hover:text-sub hover:underline hidden'
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input
                  placeholder='Enter password'
                  {...field}
                  type='password'
                  className='bg-white'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isPending}>
          Sign in
        </Button>
      </form>
    </Form>
  )
}
