import type { TProject } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import { Checkbox } from '@buildit/ui/checkbox'
import { cn } from '@buildit/ui/cn'
import { Tooltip, TooltipContent, TooltipTrigger } from '@buildit/ui/tooltip'

import { Icons } from '@/components/ui/icons'
import {
  priorityOptions,
  statusOptions,
} from '@/configs/project-filter-settings'

interface ProjectCardProps {
  project: Omit<TProject, 'issues' | 'teams'>
  isFirst: boolean
  isLast: boolean
}

/**
 * The ProjectCard component. Displays a single project.
 * @param props The props for the component.
 * @param props.project The project object.
 * @param props.isFirst Whether the project is the first in the list.
 * @param props.isLast Whether the project is the last in the list.
 * @returns JSX Element.
 */
export default function ProjectCard({
  project,
  isFirst,
  isLast,
}: ProjectCardProps): JSX.Element {
  const priorityIconName = priorityOptions.find(
    (priority) => priority.value === project.priority,
  )?.icon
  const statusIconName = statusOptions.find(
    (status) => status.value === project.status,
  )?.icon

  const PriorityIcon = Icons[priorityIconName as keyof typeof Icons]
  const StatusIcon = Icons[statusIconName as keyof typeof Icons]

  return (
    <div
      className={cn(
        'flex items-center border-x p-3 bg-white hover:bg-weak/50 transition-colors duration-200',
        isFirst && 'rounded-t-lg border-t',
        isLast ? 'rounded-b-lg border-b mb-2' : 'border-b',
      )}
      role='listitem'
    >
      <div className='flex items-center w-full'>
        <div className='group flex items-center space-x-2'>
          <Checkbox
            onClick={(e) => {
              e.stopPropagation()
            }}
            className={`group-hover:opacity-100 opacity-0 transition-opacity duration-150 mr-2 ease-in-out`}
          />
          <Icons.hexagon className='size-4 text-sub' />
          <span className='text-sub text-sm font-medium ml-2 flex-grow truncate select-none'>
            {project.name}
          </span>
        </div>
        <div className='ml-auto flex items-center space-x-4 flex-shrink-0'>
          <Tooltip>
            <TooltipTrigger>
              <PriorityIcon className='size-4 text-sub' />
            </TooltipTrigger>
            <TooltipContent className='capitalize'>
              Priority: {project.priority}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <StatusIcon className='size-4 text-sub' />
            </TooltipTrigger>

            <TooltipContent className='capitalize'>
              Status: {project.status}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            {project.leadId ? (
              project.lead && (
                <>
                  <TooltipTrigger>
                    <Avatar className='size-5'>
                      <AvatarImage
                        src={project.lead.image ?? ''}
                        alt={project.lead.name ?? ''}
                      />
                      <AvatarFallback>
                        {project.lead.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent align='end'>
                    Lead: {project.lead.name}
                  </TooltipContent>
                </>
              )
            ) : (
              <>
                <TooltipTrigger>
                  <Icons.userCircle2
                    className='size-5 text-soft'
                    aria-label='Unassigned'
                  />
                </TooltipTrigger>
                <TooltipContent align='end'>Lead: Unassigned</TooltipContent>
              </>
            )}
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
