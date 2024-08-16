import { useRouter } from 'next/navigation'

import type { TTeam } from '@buildit/utils/types'
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
import { CreateProjectSchema } from '@buildit/utils/validations'

import { api } from '@/lib/trpc/react'

/**
 * The new project form. This is the form that is used to create a new project.
 * @param props The props.
 * @param props.onOpenChange The function to change the open state of the modal.
 * @param props.team The team.
 * @returns The new project form.
 */
export default function NewProjectForm({
  onOpenChange,
  team,
}: {
  onOpenChange: (isOpen: boolean) => void
  team: TTeam | undefined
}): JSX.Element {
  const router = useRouter()

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      projectName: '',
    },
  })

  const mutation = api.project.create_project.useMutation({
    onSuccess: () => {
      onOpenChange(false)
      router.refresh()
    },
    onError: () => {
      onOpenChange(false)
    },
  })

  const onSubmit = (values: z.infer<typeof CreateProjectSchema>) => {
    mutation.mutate({ projectName: values.projectName, teamId: team?.id })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='projectName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Acme'
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

          <Button
            type='submit'
            className='w-fit'
            disabled={mutation.isPending || mutation.isSuccess}
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}
