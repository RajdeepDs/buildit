import type { TIssue } from '@buildit/utils/types'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * The hook to update the content of an issue.
 * @param issueId The ID of the issue.
 * @returns The mutation to update the content of an issue.
 */
export function useUpdateIssueContent(issueId: string) {
  const queryClient = useQueryClient()

  return api.issues.update_issue_content.useMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [
          ['issues', 'get_issue_by_id'],
          { input: { id: issueId }, type: 'query' },
        ],
      })

      const previousIssue = queryClient.getQueryData<TIssue>([
        ['issues', 'get_issue_by_id'],
        { input: { id: issueId }, type: 'query' },
      ])

      await queryClient.setQueryData(
        [
          ['issues', 'get_issue_by_id'],
          { input: { id: issueId }, type: 'query' },
        ],
        (oldData: TIssue | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            ...variables,
          }
        },
      )

      return { previousIssue }
    },
    onSuccess: ({ message }) => {
      toast({
        description: message,
        variant: 'default',
      })
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [
          ['issues', 'get_issue_by_id'],
          { input: { id: issueId }, type: 'query' },
        ],
        context?.previousIssue,
      )

      toast({
        title: 'Failed to update issue',
        description: error.message,
        variant: 'destructive',
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          ['issues', 'get_issue_by_id'],
          { input: { id: issueId }, type: 'query' },
        ],
      })
    },
  })
}
