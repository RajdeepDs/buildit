'use client'

import type { ChangeWorkspaceNameInput } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { ChangeWorkspaceNameSchema } from '@buildit/utils/validations'

/**
 * The workspace form component. This component is used to display the change workspace details
 * @returns The change workspace form component.
 */
export default function WorkspaceForm(): JSX.Element {
  const form = useForm<ChangeWorkspaceNameInput>({
    resolver: zodResolver(ChangeWorkspaceNameSchema),
    defaultValues: {
      name: '',
    },
  })
  const onSubmit = (values: ChangeWorkspaceNameInput) => {
    console.log(values)
  }
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
