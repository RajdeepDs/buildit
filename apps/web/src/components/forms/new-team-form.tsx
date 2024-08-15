import { useRouter } from 'next/navigation'

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
 * The new team form. This is the form that is used to create a new team.
 * @param props The props.
 * @param props.onOpenChange The function to change the open state of the modal.
 * @returns The new team form.
 */
export default function NewTeamForm({
  onOpenChange,
}: {
  onOpenChange: (isOpen: boolean) => void
}): JSX.Element {
  const router = useRouter()

  const form = useForm<z.infer<typeof CreateTeamFormSchema>>({
    resolver: zodResolver(CreateTeamFormSchema),
    defaultValues: {
      teamName: '',
      teamIdentifier: '',
    },
  })

  const mutation = api.team.create_team.useMutation({
    onSuccess: () => {
      onOpenChange(false)
      router.refresh()
    },
    onError: () => {
      onOpenChange(false)
    },
  })

  const onSubmit = (values: z.infer<typeof CreateTeamFormSchema>) => {
    mutation.mutate(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='teamName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Acme Inc.'
                    required
                    autoComplete='off'
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
                <FormLabel>Team Identifier</FormLabel>
                <FormControl>
                  <Input
                    placeholder='ACME'
                    required
                    autoComplete='off'
                    maxLength={5}
                    {...field}
                    className='bg-white uppercase'
                  />
                </FormControl>
                <FormDescription>Will be used in issue IDs</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full'
            disabled={mutation.isPending || mutation.isSuccess}
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  )
}
