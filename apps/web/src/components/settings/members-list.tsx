import type { TUser } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Badge } from '@buildit/ui/badge'

interface MembersListProps {
  user: Pick<TUser, 'name' | 'email' | 'image'>
}

/**
 * MembersList component. This component is used to display the list of members.
 * @param props The props object.
 * @param props.user The users object.
 * @returns The members list component.
 */
export default function MembersList({ user }: MembersListProps): JSX.Element {
  return (
    <div className='flex flex-col'>
      {/* Members list - User */}
      <div className='flex items-center justify-between border rounded-md p-3'>
        <div className='flex items-center gap-3'>
          {user.image && (
            <Avatar className='size-7'>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className='flex flex-col items-start'>
            <span className='text-sm font-medium'>{user.name}</span>
            <span className='text-xs text-sub'>{user.email}</span>
          </div>
        </div>
        <Badge className='text-sm font-normal'>Admin</Badge>
      </div>
      {/* Members list - All other members */}
    </div>
  )
}
