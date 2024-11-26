import { api } from '@/lib/trpc/react'

/**
 * The hook to get all projects.
 * @returns The projects.
 */
export function useProjects() {
  return api.project.get_projects.useQuery()
}

/**
 * The hook to get projects by team.
 * @param teamId The team ID.
 * @returns The projects by team.
 */
export function useProjectsByTeam(teamId: string) {
  return api.project.get_projects_by_teams.useQuery({ teamId: teamId })
}
