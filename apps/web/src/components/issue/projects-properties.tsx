import { useState } from 'react'

import type { TProject } from '@buildit/utils/types'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'
import { toast } from '@buildit/ui/toast'

import PropertiesMenu from '@/components/issue/properties-menu'
import { Icons } from '@/components/ui/icons'
import { useProjectOptions } from '@/configs/filter-settings'
import { api } from '@/lib/trpc/react'

interface ProjectPropertiesProps {
  id: string
  project: TProject | null | undefined
}

/**
 * Default properties for the issue component. This component is used to display the properties of the issue - status, priority, assignee.
 * @param props The props for the DefaultProperties component.
 * @param props.id The ID of the issue.
 * @param props.project The project for which the properties are to be displayed.
 * @returns JSX.Element
 */
export default function ProjectProperties({
  id,
  project,
}: ProjectPropertiesProps): JSX.Element {
  const [activeItem, setActiveItem] = useState('')
  const [projectOption, setProjectOption] = useState(project?.id)

  const projectsOptions = useProjectOptions()

  const selectedProject = projectsOptions.find(
    (item) => item.value === projectOption,
  )

  const mutation = api.issues.update_issue_properties.useMutation({
    onSuccess: ({ message }) => {
      toast({
        description: message,
      })
    },
    onError: ({ message }) => {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: message,
      })
    },
  })

  const handleUpdate = (key: string, value: string | null) => {
    mutation.mutate({ id: id, [key]: value })
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <PropertiesMenu
          property='project'
          handleSelect={(value) => {
            setProjectOption(value)
            handleUpdate('projectId', value === 'no project' ? null : value)
          }}
          handleActiveItem={setActiveItem}
        >
          <SidebarMenuButton
            className='capitalize text-sub font-medium'
            onClick={() => {
              setActiveItem('project')
            }}
            isActive={activeItem === 'project'}
          >
            {selectedProject ? (
              <>
                <Icons.hexagon className='size-4 text-sub' />
                <span className='normal-case'>{selectedProject.label}</span>
              </>
            ) : (
              <>
                <Icons.hexagon className='size-4 text-sub' />
                <span className='normal-case'>Add to project</span>
              </>
            )}
          </SidebarMenuButton>
        </PropertiesMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
