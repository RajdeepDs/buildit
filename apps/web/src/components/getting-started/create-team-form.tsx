import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
import { Input } from '@buildit/ui/input'
import { CreateTeamFormSchema } from '@buildit/utils/validations'

import { api } from '@/lib/trpc/react'

/**
 * The create team form component. This form is used to create a team. It is used in the onboarding process.
 * @param props The props for the create team form component.
 * @param props.nextStep The function to call when the form is submitted.
 * @returns The create team form component.
 */
export default function CreateTeamForm({ nextStep }: { nextStep: () => void }) {
  const form = useForm<z.infer<typeof CreateTeamFormSchema>>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      teamName: '',
      teamIdentifier: '',
    },
  })

  const mutation = api.onboarding.create_team.useMutation({
    onSuccess: () => {
      nextStep()
    },
  })

  const onSubmit = (values: z.infer<typeof CreateTeamFormSchema>) => {
    mutation.mutate({
      teamIdentifier: values.teamIdentifier,
      teamName: values.teamName,
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='teamName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sub'>Team name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Acme Inc.'
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
            name='teamIdentifier'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sub'>Team Identifier</FormLabel>
                <FormControl>
                  <Input
                    placeholder='ACME'
                    required
                    maxLength={5}
                    {...field}
                    className='bg-white uppercase'
                  />
                </FormControl>
                <FormDescription>Will be used in issue IDs.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full'
            disabled={mutation.isPending || mutation.isSuccess}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}
