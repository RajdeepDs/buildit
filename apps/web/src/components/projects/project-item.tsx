import { useRouter } from 'next/navigation'

import type { TProject } from '@buildit/utils/types'
import type { ReactNode } from 'react'

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
  children: ReactNode
}

/**
 * The project item component. Displays a single project.
 * @param props ProjectItemProps
 * @param props.project The project object.
 * @param props.children The children to render.
 * @returns JSX.Element
 */
export default function ProjectItem({
  project,
  children,
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
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
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
