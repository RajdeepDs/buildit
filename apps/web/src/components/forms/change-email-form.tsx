'use client'

import type { OnlyPasswordInput } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@buildit/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { OnlyPasswordSchema } from '@buildit/utils/validations'

/**
 * The change email form component. This component is used to display the change email form.
 * @returns The change email form component.
 */
export default function ChangeEmailForm(): JSX.Element {
  const passwordForm = useForm<OnlyPasswordInput>({
    resolver: zodResolver(OnlyPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: OnlyPasswordInput) => {
    console.log(values)
  }
  return (
    <div className='mt-4'>
      <Form {...passwordForm}>
        <form
          className='space-y-4'
          onSubmit={passwordForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={passwordForm.control}
            name='password'
            render={({ field }) => (
              <FormItem className='space-y-1 flex flex-col'>
                <FormLabel className='text-xs text-sub'>
                  Enter your password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    placeholder='Password'
                    className='bg-weak h-8 shadow-none'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Todo: Add password checks and implement a form field for new email and sends verification code */}
          <Button className='w-full' size={'sm'}>
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}
