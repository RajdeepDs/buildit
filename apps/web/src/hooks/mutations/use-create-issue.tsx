import { useQueryClient } from '@tanstack/react-query'

import { sonner } from '@buildit/ui/sonner'

import CreateIssueNotification from '@/components/ui/toast/create-issue'
import ErrorNotification from '@/components/ui/toast/error'
import { api } from '@/lib/trpc/react'

/**
 * Hook to create an issue.
 * @returns Mutation object for creating an issue.
 */
export function useCreateIssue() {
  const queryClient = useQueryClient()

  return api.issues.create_issue.useMutation({
    onSuccess: async ({ message, issueId, title }) => {
      sonner.custom((t) => (
        <CreateIssueNotification
          t={t}
          message={message}
          issueId={issueId}
          title={title}
        />
      ))

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
