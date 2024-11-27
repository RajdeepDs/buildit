import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to create an issue.
 * @returns Mutation object for creating an issue.
 */
export function useCreateIssue() {
  const queryClient = useQueryClient()

  return api.issues.create_issue.useMutation({
    onSuccess: async ({ message }) => {
      toast({
        title: 'Issue created!',
        description: message,
      })

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [['issues', 'get_issues'], { type: 'query' }],
        }),
        queryClient.invalidateQueries({
          queryKey: [['issues', 'get_issues_by_team'], { type: 'query' }],
        }),
      ])
    },
    onError: ({ message }) => {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: message,
      })
    },
  })
}
