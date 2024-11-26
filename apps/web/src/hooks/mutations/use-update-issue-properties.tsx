import type { TIssue } from '@buildit/utils/types'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to update a particular property of an issue.
 * @returns The mutation object.
 */
export function useUpdateIssueProperties() {
  const queryClient = useQueryClient()

  return api.issues.update_issue_properties.useMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [['issues', 'get_issues'], { type: 'query' }],
      })

      // Retrieve all cached queries for get_issues_by_team
      const queryKeys = queryClient
        .getQueriesData({
          queryKey: [['issues', 'get_issues_by_team']],
        })
        .map(([queryKey]) => queryKey)

      const previousIssues = queryClient.getQueryData<TIssue[]>([
        'issues',
        'get_issues',
      ])

      const previousTeamIssuesMap: Record<string, TIssue[]> = {}

      const updateIssues = (issues: TIssue[] | undefined) =>
        issues?.map((issue) =>
          issue.id === variables.id
            ? {
                ...issue,
                [variables.property]: variables.value,
              }
            : issue,
        )

      if (previousIssues) {
        queryClient.setQueryData(
          ['issues', 'get_issues'],
          updateIssues(previousIssues),
        )
      }

      // Update each team-specific cache
      queryKeys.forEach((key) => {
        const teamId = (key[1] as { input?: { teamId?: string } }).input?.teamId
        if (teamId) {
          const teamIssues = queryClient.getQueryData<TIssue[]>(key)
          if (teamIssues) {
            previousTeamIssuesMap[teamId] = teamIssues
            queryClient.setQueryData(key, updateIssues(teamIssues))
          }
        }
      })

      return { previousIssues, previousTeamIssuesMap }
    },
    onSuccess: ({ message }) => {
      toast({
        description: message,
      })
    },
    onError: (error, variables, context) => {
      if (context?.previousIssues) {
        queryClient.setQueryData(
          ['issues', 'get_issues'],
          context.previousIssues,
        )
      }

      if (context?.previousTeamIssuesMap) {
        Object.entries(context.previousTeamIssuesMap).forEach(
          ([teamId, issues]) => {
            queryClient.setQueryData(
              [
                'issues',
                'get_issues_by_team',
                { input: { teamId } },
                { type: 'query' },
              ],
              issues,
            )
          },
        )
      }

      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error.message,
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [['issues', 'get_issues'], { type: 'query' }],
      })
      await queryClient.invalidateQueries({
        queryKey: [['issues', 'get_issues_by_team']],
      })
    },
  })
}
