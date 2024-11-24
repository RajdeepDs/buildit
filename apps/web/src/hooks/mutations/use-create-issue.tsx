import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to create an new issue.
 * @returns The mutation object.
 */
export function useCreateIssue() {
  const queryClient = useQueryClient()

  return api.issues.create_issue.useMutation({
    onSuccess: async ({ message }) => {
      toast({
        title: 'Issue created!',
        description: message,
      })
      await queryClient.invalidateQueries({
        queryKey: [['issues', 'get_issues'], { type: 'query' }],
      })
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
