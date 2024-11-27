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
        ['issues', 'get_issues'],
        { type: 'query' },
      ])

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

      return { previousIssues }
    },
    onSuccess: ({ message }) => {
      toast({
        description: message,
      })
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [['issues', 'get_issues'], { type: 'query' }],
        context?.previousIssues,
      )

      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error.message,
      })
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [['issues', 'get_issues'], { type: 'query' }],
        }),
      ])
    },
  })
}
