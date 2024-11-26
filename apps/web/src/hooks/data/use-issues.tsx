import { api } from '@/lib/trpc/react'

/**
 * The hook to get all issues.
 * @returns The issues.
 */
export function useIssues() {
  return api.issues.get_issues.useQuery()
}

/**
 * The hook to get issues by team.
 * @param teamId The team ID.
 * @returns The issues by team.
 */
export function useIssuesByTeam(teamId: string) {
  return api.issues.get_issues_by_team.useQuery({ teamId: teamId })
}

/**
 * The hook to get issues by project.
 * @param issueId The project ID.
 * @returns The issues by project.
 */
export function useIssueById(issueId: string) {
  return api.issues.get_issue_by_id.useQuery(
    { id: issueId },
    { enabled: !!issueId },
  )
}
