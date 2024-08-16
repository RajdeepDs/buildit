import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
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
import { Input, InputWithContent } from '@buildit/ui/input'
import { WorkspaceSetupFormSchema } from '@buildit/utils/validations'

import { api } from '@/lib/trpc/react'

/**
 * The workspace setup form component. This form is used to create a workspace. It is used in the onboarding process.
 * @param props The props for the workspace setup form component.
 * @param props.nextStep The function to call when the form is submitted.
 * @returns The workspace setup form component.
 */
export default function WorkspaceSetupForm({
  nextStep,
}: {
  nextStep: () => void
}) {
  const form = useForm<z.infer<typeof WorkspaceSetupFormSchema>>({
    resolver: zodResolver(WorkspaceSetupFormSchema),
    defaultValues: {
      workspaceName: '',
      workspaceSlug: '',
    },
  })

  const mutation = api.onboarding.workspace_setup.useMutation({
    onSuccess: () => {
      nextStep()
    },
  })

  const onSubmit = (values: z.infer<typeof WorkspaceSetupFormSchema>) => {
    mutation.mutate({
      workspaceName: values.workspaceName,
      workspaceSlug: values.workspaceSlug,
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='workspaceName'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sub'>Workspace name</FormLabel>
                <FormControl
                  onChange={() => {
                    form.setValue(
                      'workspaceSlug',
                      slugify(form.getValues('workspaceName')),
                    )
                  }}
                >
                  <Input
                    placeholder='Acme, Inc.'
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
            name='workspaceSlug'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sub'>Workspace URL</FormLabel>
                <FormControl>
                  <InputWithContent
                    placeholder='acme'
                    required
                    className='bg-white'
                    content='buildit.codes'
                    {...field}
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
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}
