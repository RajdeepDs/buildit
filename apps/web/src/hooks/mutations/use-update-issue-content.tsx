import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * The hook to update the content of an issue.
 * @returns The mutation to update the content of an issue.
 */
export function useUpdateIssueContent() {
  return api.issues.update_issue_content.useMutation({
    onSuccess: ({ message }) => {
      toast({
        description: message,
        variant: 'default',
      })
    },
    onError: ({ message }) => {
      toast({
        description: message,
        variant: 'destructive',
      })
    },
  })
}
