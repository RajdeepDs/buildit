'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { redirect } from 'next/navigation'

import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { generateEmailVerificationCode } from '@buildit/auth/actions/email'
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

const COOLDOWN_PERIOD = 60 // Time in seconds

/**
 * The verify-code form component, which will allow the user to verify their email.
 * @param props The props for the component.
 * @param props.email The email to verify.
 * @param props.userId The userId to verify.
 * @param props.name The name of the user.
 * @returns JSX.Element
 */
export default function VerifyCode({
  userId,
  email,
  name,
}: {
  userId: string
  email: string
  name: string
}): JSX.Element {
  const { toast } = useToast()
  const [cooldown, setCooldown] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [verifyPending, verifyTransition] = useTransition()
  const [initialCodeSent, setInitialCodeSent] = useState(false)

  const form = useForm<z.infer<typeof VerifyEmailSchema>>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: { code: '' },
  })

  const sendCode = useCallback(() => {
    startTransition(async () => {
      try {
        await generateEmailVerificationCode(userId, email, name)
        toast({
          title: 'Code Sent!',
          description: `A verification code has been sent to ${email}.`,
        })
        setCooldown(COOLDOWN_PERIOD)
      } catch (error) {
        toast({
          title: 'Error Sending Code!',
          description:
            'There was an issue sending the verification code. Please try again later.',
          variant: 'destructive',
        })
      }
    })
  }, [userId, email, name, toast])

  useEffect(() => {
    if (!initialCodeSent) {
      sendCode()
      setInitialCodeSent(true)
    }

    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [initialCodeSent, sendCode])

  const onSubmit = (values: z.infer<typeof VerifyEmailSchema>) => {
    verifyTransition(async () => {
      const { success, error } = await verifyEmail(null, values)
      if (success) {
        toast({
          title: 'Email Verified!',
          description: 'Thank you for verifying your email. Redirecting...',
        })
        redirect('/getting-started/')
      } else {
        toast({
          title: 'Verification Failed!',
          description: error,
          variant: 'destructive',
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
                        ))}
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
              <FormDescription>
                Code was sent to <strong>{email}</strong>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={verifyPending}>
          {verifyPending ? 'Verifying...' : 'Verify'}
        </Button>
        <FormDescription className='text-center text-xs'>
          Didn&apos;t receive the code?{' '}
          <Button
            variant='link'
            size='sm'
            disabled={cooldown > 0 || isPending}
            onClick={sendCode}
          >
            {cooldown > 0 ? `Resend in ${cooldown.toString()}s` : 'Resend Code'}
          </Button>
        </FormDescription>
      </form>
    </Form>
  )
}
