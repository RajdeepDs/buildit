import { usePathname } from 'next/navigation'

import {
  priorityConfig as issuesPriorityConfig,
  statusConfig as issuesStatusConfig,
} from '@/configs/filter/issues-config'
import {
  priorityConfig as projectsPriorityConfig,
  statusConfig as projectsStatusConfig,
} from '@/configs/filter/projects-config'

/**
 * This hook is used to get the filter options for the filter component.
 * @returns The filter options.
 */
export default function useFilterOptions() {
  const pathname = usePathname()
  const isIssuePage =
    pathname === '/' ||
    pathname.includes('/active') ||
    pathname.includes('/backlog')
  const statusOptions = isIssuePage ? issuesStatusConfig : projectsStatusConfig
  const priorityOptions = isIssuePage
    ? issuesPriorityConfig
    : projectsPriorityConfig

  return { statusOptions, priorityOptions }
}
