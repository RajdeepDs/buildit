import { useQueryClient } from '@tanstack/react-query'

import { sonner } from '@buildit/ui/sonner'

import ErrorNotification from '@/components/ui/toast/error'
import SuccessNotification from '@/components/ui/toast/success'
import { api } from '@/lib/trpc/react'

/**
 * Hook to delete an issue.
 * @returns The mutation object.
 */
export function useDeleteIssue() {
  const queryClient = useQueryClient()

  return api.issues.delete_issue.useMutation({
    onSuccess: async ({ message }) => {
      sonner.custom((t) => <SuccessNotification t={t} message={message} />)
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [['issues', 'get_issues'], { type: 'query' }],
        }),

        queryClient.invalidateQueries({
          queryKey: [['issues', 'get_issues_by_team'], { type: 'query' }],
        }),
      ])
    },
    onError: () => {
      sonner.custom((t) => <ErrorNotification t={t} />)
    },
  })
}
