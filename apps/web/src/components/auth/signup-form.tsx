'use client'

import { useTransition } from 'react'
import { redirect } from 'next/navigation'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { generateEmailVerificationCode } from '@buildit/auth/actions/email'
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
import { useToast } from '@buildit/ui/toast'
import { SignUpSchema } from '@buildit/utils/validations'

/**
 * The sign-up form component, which will allow the user to sign-up with their email and password.
 * @returns JSX.Element
 */
export default function SignUpForm(): JSX.Element {
  const { toast } = useToast()

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
        toast({
          title: 'Thank you for signing up!',
          description:
            'Please verify your email to complete the sign-up process',
        })

        if (success) {
          await generateEmailVerificationCode(success, values.email)
        } else {
          toast({
            title: "Couldn't generate email verification code!",
            description: 'Please try again',
          })
        }
        // TODO: Implement a resend email verification code feature

        redirect('/verify-email')
      }
      if (error) {
        toast({
          title: "Couldn't sign up!",
          description: error,
        })
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
