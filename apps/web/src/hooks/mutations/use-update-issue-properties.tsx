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
      const previousIssues = queryClient.getQueryData<TIssue[]>([
        'issues',
        'get_issues',
      ])
      if (previousIssues) {
        const updatedIssues = previousIssues.map((issue) =>
          issue.id === variables.id
            ? {
                ...issue,
                [variables.property]: variables.value,
              }
            : issue,
        )
        queryClient.setQueryData(['issues', 'get_issues'], updatedIssues)
      }
      return { previousIssues }
    },
    onError: (error, variables, context) => {
      if (context?.previousIssues) {
        queryClient.setQueryData(
          ['issues', 'get_issues'],
          context.previousIssues,
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
    },
  })
}
