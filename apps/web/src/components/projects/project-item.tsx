import { useRouter } from 'next/navigation'

import type { TProject } from '@buildit/utils/types'

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

interface ProjectItemProps {
  project: Omit<TProject, 'issues' | 'teams'>
}

/**
 * The project item component. Displays a single project.
 * @param props ProjectItemProps
 * @param props.project The project object.
 * @returns JSX.Element
 */
export default function ProjectItem({
  project,
}: ProjectItemProps): JSX.Element {
  const router = useRouter()
  const { toast } = useToast()

  const mutation = api.project.delete_project.useMutation({
    onSuccess: () => {
      toast({
        description: 'Project deleted successfully!',
      })
      router.refresh()
    },
    onError: () => {
      toast({
        description: 'Error deleting project!',
      })
    },
  })
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className='flex cursor-pointer items-center justify-between border-b px-5 py-2 hover:bg-muted'>
          <div className='flex items-center space-x-4'>
            <Icons.hexagon className='h-4 w-4 text-sub' />
            <h2 className='font-medium text-strong'>{project.name}</h2>
          </div>
          <div className='flex items-center space-x-4'>
            <Avatar className='size-6'>
              <AvatarImage src={project.user?.image ?? ''} alt='user' />
              <AvatarFallback>{project.user?.name}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className='w-56'>
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              mutation.mutate({ projectId: project.id })
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
