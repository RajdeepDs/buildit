'use client'

import { useTransition } from 'react'
import { redirect } from 'next/navigation'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { verifyEmail } from '@buildit/auth/actions/verifyEmail'
import { Button } from '@buildit/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@buildit/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@buildit/ui/input-otp'
import { useToast } from '@buildit/ui/toast'
import { VerifyEmailSchema } from '@buildit/utils/validations'

/**
 * The verify-code form component, which will allow the user to verify their email.
 * @param props The props for the component.
 * @param props.email The email to verify.
 * @returns JSX.Element
 */
export default function VerifyCode({ email }: { email: string }): JSX.Element {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof VerifyEmailSchema>>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      code: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof VerifyEmailSchema>) => {
    startTransition(async () => {
      const { error, success } = await verifyEmail(null, values)
      if (success) {
        toast({
          title: 'Email verified!',
          description: 'Thank you for verifying your email.',
        })
        redirect('/getting-started/')
      }
      if (error) {
        toast({
          title: "Couldn't verify email!",
          description: error,
        })
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-full'>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sub'>Verification Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={8}
                  {...field}
                  render={({ slots }) => (
                    <>
                      <InputOTPGroup>
                        {slots.slice(0, 4).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}{' '}
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        {slots.slice(4).map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} />
                        ))}
                      </InputOTPGroup>
                    </>
                  )}
                />
              </FormControl>
              <FormDescription>Code was sent to {email}.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={isPending}>
          Verify
        </Button>
      </form>
    </Form>
  )
}
