import { useRouter } from 'next/navigation'

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
import { sonner } from '@buildit/ui/sonner'
import { Textarea } from '@buildit/ui/textarea'
import { UserProfileFormSchema } from '@buildit/utils/validations'

import SettingsSuccessNotification from '@/components/ui/toast/settings-success'
import { api } from '@/lib/trpc/react'

/**
 * The user profile form component. This form is used to update the user's profile. It is used in the onboarding process.
 * @returns The user profile form component.
 */
export default function UserProfileForm() {
  const form = useForm<z.infer<typeof UserProfileFormSchema>>({
    resolver: zodResolver(UserProfileFormSchema),
    defaultValues: {
      fullname: '',
      username: '',
      bio: '',
    },
  })
  const router = useRouter()

  const onboardingMutation = api.onboarding.update_onboarding.useMutation({
    onSuccess: () => {
      sonner.custom((t) => (
        <SettingsSuccessNotification
          t={t}
          title='Onboarding completed!'
          description='Thank you for completing your onboarding.'
        />
      ))
    },
  })

  const mutation = api.onboarding.update_user_profile.useMutation({
    onSuccess: () => {
      onboardingMutation.mutate()
      router.push('/')
    },
  })

  const onSubmit = (values: z.infer<typeof UserProfileFormSchema>) => {
    mutation.mutate({
      fullname: values.fullname,
      username: values.username,
      bio: values.bio,
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sub'>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='John Doe'
                    required
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sub'>User name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='johndoe'
                    required
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
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sub'>About</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className='bg-white min-h-[80px]'
                    placeholder='Write something about yourself.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full'
            disabled={mutation.isPending || mutation.isSuccess}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
