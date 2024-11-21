import { useState } from 'react'

import type { TUser } from '@buildit/utils/types'

import { Avatar, AvatarFallback, AvatarImage } from '@buildit/ui/avatar'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'

import PropertiesMenu from '@/components/issue/properties-menu'
import { Icons } from '@/components/ui/icons'
import { useAssigneeOptions } from '@/configs/filter-settings'
import { priorityConfig, statusConfig } from '@/configs/issue-config'
import { getIcon } from '@/lib/get-icons'

interface DefaultPropertiesProps {
  status: string | null
  priority: string | null
  assignee: TUser | null | undefined
}

/**
 * Default properties for the issue component. This component is used to display the properties of the issue - status, priority, assignee.
 * @param props The props for the DefaultProperties component.
 * @param props.status The status of the issue.
 * @param props.priority The priority of the issue.
 * @param props.assignee The assignee of the issue.
 * @returns JSX.Element
 */
export default function DefaultProperties({
  status,
  priority,
  assignee,
}: DefaultPropertiesProps): JSX.Element {
  const [activeItem, setActiveItem] = useState('')
  const [statusOption, setStatusOption] = useState(status)
  const [priorityOption, setPriorityOption] = useState(priority)
  const [assigneeOption, setAssigneeOption] = useState(assignee?.id)

  const assigneeOptions = useAssigneeOptions()

  const statusIconName = statusConfig.find(
    (item) => item.value === statusOption,
  )?.icon
  const priorityIconName = priorityConfig.find(
    (item) => item.value === priorityOption,
  )?.icon

  const StatusIcon = getIcon(statusIconName)
  const PriorityIcon = getIcon(priorityIconName)

  const selectedAssignee = assigneeOptions.find(
    (item) => item.value === assigneeOption,
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <PropertiesMenu
          property='status'
          handleSelect={setStatusOption}
          handleActiveItem={setActiveItem}
        >
          <SidebarMenuButton
            className='capitalize text-sub font-medium'
            onClick={() => {
              setActiveItem('status')
            }}
            isActive={activeItem === 'status'}
          >
            {StatusIcon && <StatusIcon className='size-4 text-sub' />}
            {statusOption}
          </SidebarMenuButton>
        </PropertiesMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <PropertiesMenu
          property='priority'
          handleSelect={setPriorityOption}
          handleActiveItem={setActiveItem}
        >
          <SidebarMenuButton
            className='capitalize text-sub font-medium'
            onClick={() => {
              setActiveItem('priority')
            }}
            isActive={activeItem === 'priority'}
          >
            {PriorityIcon && <PriorityIcon className='size-4 text-sub' />}
            {priorityOption}
          </SidebarMenuButton>
        </PropertiesMenu>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <PropertiesMenu
          property='assignee'
          handleSelect={setAssigneeOption}
          handleActiveItem={setActiveItem}
        >
          <SidebarMenuButton
            className='capitalize text-sub font-medium'
            onClick={() => {
              setActiveItem('assignee')
            }}
            isActive={activeItem === 'assignee'}
          >
            {selectedAssignee ? (
              <>
                <Avatar className='size-4'>
                  <AvatarImage src={selectedAssignee.image ?? ''} />
                  <AvatarFallback>
                    {selectedAssignee.label?.at(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedAssignee.label}
              </>
            ) : (
              <>
                <Icons.userRoundPlus className='size-4 text-sub' />
                Assign
              </>
            )}
          </SidebarMenuButton>
        </PropertiesMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
