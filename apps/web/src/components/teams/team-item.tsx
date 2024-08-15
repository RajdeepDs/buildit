import Link from 'next/link'
import { useRouter } from 'next/navigation'

import type { TTeam } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@buildit/ui/context-menu'
import { useToast } from '@buildit/ui/toast'

import { Icons } from '@/components/ui/icons'
import { api } from '@/lib/trpc/react'

interface TeamsItemProps {
  team: Omit<TTeam, 'issues'>
}

/**
 * The team item component. Displays a single team.
 * @param props TeamsItemProps
 * @param props.team The team object.
 * @returns JSX.Element
 */
export default function TeamItem({ team }: TeamsItemProps): JSX.Element {
  const router = useRouter()

  const { toast } = useToast()
  const mutation = api.team.delete_team.useMutation({
    onSuccess: () => {
      toast({
        description: 'Team deleted!',
      })
      router.refresh()
    },
    onError: () => {
      toast({
        description: 'Error deleting team!',
      })
    },
  })
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`team/${team.teamId}/active`}
          className='flex cursor-pointer items-center justify-between border-b px-5 py-2 hover:bg-weak'
        >
          <div className='flex items-center space-x-4'>
            <h2 className='font-medium'>{team.name}</h2>
            <p className='text-sm text-subtle'>{team.teamId}</p>
          </div>
          <div className='flex items-center space-x-4'>
            <Avatar className='size-6'>
              <AvatarImage src={team.user?.image ?? ''} alt='user' />
              <AvatarFallback>{team.user?.name}</AvatarFallback>
            </Avatar>
          </div>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-56'>
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              mutation.mutate({ teamId: team.id })
            }}
          >
            <Icons.trash className='mr-2 h-4 w-4' />
            Delete
            <ContextMenuShortcut>Delete</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}
