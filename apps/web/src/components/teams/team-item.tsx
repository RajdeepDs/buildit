import type { TTeam } from '@buildit/utils/types'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@buildit/ui/context-menu'

import { Icons } from '@/components/ui/icons'
import { useDeleteTeam } from '@/hooks/mutations/use-delete-team'

interface TeamsItemProps {
  team: Omit<TTeam, 'issues'>
  children?: React.ReactNode
}

/**
 * The team item component. Displays a single team.
 * @param props TeamsItemProps
 * @param props.team The team object.
 * @param props.children The children of the component.
 * @returns JSX.Element
 */
export default function TeamItem({
  team,
  children,
}: TeamsItemProps): JSX.Element {
  const mutation = useDeleteTeam()

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
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
