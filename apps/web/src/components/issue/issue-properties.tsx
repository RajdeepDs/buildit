import type { TIssue } from '@buildit/utils/types'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@buildit/ui/sidebar'

import DefaultProperties from '@/components/issue/default-properties'
import Labels from '@/components/issue/labels'
import ProjectProperties from '@/components/issue/projects-properties'

interface IssuePropertiesProps {
  isLoading: boolean
  properties: Omit<TIssue, 'title' | 'description'> | undefined
}

/**
 * The IssueProperties component is the sidebar that displays the properties of the issue.
 * @param props The props for the IssueProperties component.
 * @param props.isLoading Whether the issue is loading.
 * @param props.properties The properties of the issue.
 * @returns JSX.Element
 */
export default function IssueProperties({
  isLoading,
  properties,
}: IssuePropertiesProps): JSX.Element {
  return (
    <Sidebar
      collapsible='none'
      className={`sticky hidden lg:flex top-0 h-full border-l  ${isLoading ? 'animate-pulse bg-weak/50' : 'bg-weak/70'}`}
    >
      {/* Sidebar content - Properties of the issue */}
      <SidebarContent>
        <SidebarGroup className='pb-0'>
          <SidebarGroupLabel className='text-sub h-[30px]'>
            Properties
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {properties && (
              <DefaultProperties
                id={properties.id}
                status={properties.status}
                priority={properties.priority}
                assignee={properties.assignee}
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className='text-sub h-[30px]'>
            Labels
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                {/* TODO: Implement labels in issues and pass the issue's labels to Labels component */}
                <Labels />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className='text-sub h-[30px]'>
            Project
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {properties && (
              <ProjectProperties
                id={properties.id}
                project={properties.project}
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
