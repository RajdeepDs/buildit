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
 * @returns JSX.Element
 */
export default function VerifyCode({
  userId,
  email,
}: {
  userId: string
  email: string
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
    try {
      startTransition(async () => {
        await generateEmailVerificationCode(userId, email)
        toast({
          title: 'Code sent!',
          description: 'A verification code has been sent to your email.',
        })
        setCooldown(COOLDOWN_PERIOD)
      })
    } catch (e) {
      toast({
        title: 'Error sending code!',
        description: 'There was an error sending the verification code.',
      })
    }
  }, [email, userId, toast])

  useEffect(() => {
    if (!initialCodeSent) {
      sendCode()
      setInitialCodeSent(true)
    } else {
      const interval = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
    return undefined
  }, [initialCodeSent, sendCode])

  const onSubmit = (values: z.infer<typeof VerifyEmailSchema>) => {
    verifyTransition(async () => {
      const { error, success } = await verifyEmail(null, values)
      if (success) {
        toast({
          title: 'Email verified!',
          description: 'Thank you for verifying your email.',
        })
        redirect('/getting-started/')
      } else {
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
              <FormDescription>Code was sent to {email}.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' disabled={verifyPending}>
          {verifyPending ? 'Verifying...' : 'Verify'}
        </Button>
        <FormDescription className='text-center text-xs'>
          Are you facing any problems with receiving the code?{' '}
          <Button
            variant={'link'}
            size={'sm'}
            disabled={cooldown > 0 || isPending}
          >
            Resend Code
          </Button>
        </FormDescription>
      </form>
    </Form>
  )
}
