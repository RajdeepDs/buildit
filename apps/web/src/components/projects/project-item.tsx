import { useRouter } from 'next/navigation'

import type { TProject } from '@buildit/utils/types'
import type { ReactNode } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@buildit/ui/context-menu'
import { useToast } from '@buildit/ui/toast'

import { Icons } from '@/components/ui/icons'
import { useAssigneeOptions } from '@/configs/filter/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/filter/projects-config'
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

  const assigneeOptions = useAssigneeOptions()

  const updateMutation = api.project.update_project_properties.useMutation()

  const deleteMutation = api.project.delete_project.useMutation({
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

  const handleUpdate = (key: string, value: string | null) => {
    updateMutation.mutate({ id: project.id, [key]: value })
  }

  const handleDelete = () => {
    deleteMutation.mutate({ projectId: project.id })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className='w-48'>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icons.status className='size-4 mr-2 text-sub' />
            Status
          </ContextMenuSubTrigger>
          <ContextMenuSubContent sideOffset={4} alignOffset={-5.5}>
            {statusConfig.map((status) => {
              const Icon = Icons[status.icon as keyof typeof Icons]
              return (
                <ContextMenuCheckboxItem
                  key={status.value}
                  className='flex items-center'
                  checked={status.value === project.status}
                  onClick={() => {
                    handleUpdate('status', status.value)
                  }}
                >
                  <Icon className='size-4 mr-2 text-sub' />
                  <span>{status.label}</span>
                </ContextMenuCheckboxItem>
              )
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icons.signalHigh className='size-4 mr-2 text-sub' />
            Priority
          </ContextMenuSubTrigger>
          <ContextMenuSubContent sideOffset={4}>
            {priorityConfig.map((priority) => {
              const Icon = Icons[priority.icon as keyof typeof Icons]
              return (
                <ContextMenuCheckboxItem
                  key={priority.value}
                  className='flex items-center'
                  checked={priority.value === project.priority}
                  onClick={() => {
                    handleUpdate('priority', priority.value)
                  }}
                >
                  <Icon className='size-4 mr-2 text-sub' />
                  <span>{priority.label}</span>
                </ContextMenuCheckboxItem>
              )
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Icons.userCircle2 className='size-4 mr-2 text-sub' />
            Project Lead
          </ContextMenuSubTrigger>
          <ContextMenuSubContent sideOffset={4}>
            <ContextMenuCheckboxItem
              className='flex items-center'
              checked={!project.leadId}
              onClick={() => {
                handleUpdate('leadId', null)
              }}
            >
              <Icons.user className='size-4 mr-2 text-sub' />
              <span>Unassigned</span>
            </ContextMenuCheckboxItem>
            {assigneeOptions.map((assignee) => {
              return (
                <ContextMenuCheckboxItem
                  key={assignee.value}
                  className='flex items-center'
                  checked={assignee.value === project.leadId}
                  onClick={() => {
                    handleUpdate('leadId', assignee.value)
                  }}
                >
                  {assignee.image && (
                    <Avatar className='size-4 mr-2'>
                      <AvatarImage src={assignee.image} />
                      <AvatarFallback>
                        {assignee.label?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span>{assignee.label}</span>
                </ContextMenuCheckboxItem>
              )
            })}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => {
            handleDelete()
          }}
        >
          <Icons.trash2 className='size-4 mr-2 text-sub' />
          Delete
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
