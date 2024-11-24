import { api } from '@/lib/trpc/react'

/**
 * The hook to get all projects.
 * @returns The projects.
 */
export function useProjects() {
  return api.project.get_projects.useQuery()
}
