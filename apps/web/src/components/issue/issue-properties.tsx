import type { TIssue } from '@buildit/utils/types'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@buildit/ui/sidebar'

import DefaultProperties from '@/components/issue/default-properties'

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
                status={properties.status}
                priority={properties.priority}
                assignee={properties.assignee}
              />
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
