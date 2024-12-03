'use client'

import type { ChangeWorkspaceNameInput } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormState } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { sonner } from '@buildit/ui/sonner'
import { ChangeWorkspaceNameSchema } from '@buildit/utils/validations'

import ErrorNotification from '@/components/ui/toast/error'
import SettingsSuccessNotification from '@/components/ui/toast/settings-success'
import { api } from '@/lib/trpc/react'

/**
 * The workspace form component. This component is used to display the change workspace details
 * @param props The props object.
 * @param props.workspace_name The workspace name.
 * @returns The change workspace form component.
 */
export default function WorkspaceForm({
  workspace_name,
}: {
  workspace_name: string
}): JSX.Element {
  const form = useForm<ChangeWorkspaceNameInput>({
    resolver: zodResolver(ChangeWorkspaceNameSchema),
    defaultValues: {
      name: workspace_name,
    },
  })

  const mutation = api.settings.update_workspaceName.useMutation({
    onSuccess: ({ message }) => {
      sonner.custom((t) => (
        <SettingsSuccessNotification
          t={t}
          title='Updated!'
          description={message}
        />
      ))
    },
    onError: () => {
      sonner.custom((t) => <ErrorNotification t={t} />)
    },
  })

  const onSubmit = (values: ChangeWorkspaceNameInput) => {
    mutation.mutate(values)
  }

  const { isDirty } = useFormState({ control: form.control })

  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-1 flex flex-col'>
              <FormLabel className='text-xs text-sub'>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Workspace name'
                  className='bg-weak h-8 shadow-none w-1/4'
                  onBlur={() => {
                    if (isDirty) {
                      onSubmit(form.getValues())
                    }
                  }}
                />
              </FormControl>
              <FormDescription className='text-xs font-light text-soft'>
                You can use your organization or company name. Keep it simple.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
