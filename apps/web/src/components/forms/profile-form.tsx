import type { TUser } from '@buildit/utils/types'
import type { ProfileFormInput } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@buildit/ui/form'
import { Input } from '@buildit/ui/input'
import { ProfileFormSchema } from '@buildit/utils/validations'

interface ProfileFormProps {
  user: Pick<TUser, 'id' | 'name' | 'username' | 'email' | 'bio' | 'image'>
}

/**
 * The profile form component. This component is used to display the user's profile form.
 * @param props The props object.
 * @param props.user The user object.
 * @returns The profile form component.
 */
export default function ProfileForm({ user }: ProfileFormProps): JSX.Element {
  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: user.name ?? '',
      username: user.username ?? '',
      email: user.email,
    },
  })

  const onSubmit = (values: ProfileFormInput) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex items-center gap-4'>
          {user.image && (
            <Avatar className='size-16'>
              <AvatarImage src={user.image} alt={user.name?.charAt(0)} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className='flex items-center gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1 flex flex-col'>
                  <FormLabel className='text-xs text-sub'>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-weak h-8 shadow-none'
                      placeholder='Full name'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1 flex flex-col'>
                  <FormLabel className='text-xs text-sub'>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='bg-weak h-8 shadow-none'
                      placeholder='Username'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
