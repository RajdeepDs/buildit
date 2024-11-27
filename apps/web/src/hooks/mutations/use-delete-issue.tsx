import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to delete an issue.
 * @returns The mutation object.
 */
export function useDeleteIssue() {
  const queryClient = useQueryClient()

  return api.issues.delete_issue.useMutation({
    onSuccess: async ({ message }) => {
      toast({
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
