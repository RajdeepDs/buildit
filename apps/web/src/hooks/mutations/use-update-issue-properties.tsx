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
        queryKey: [['issues']],
      })

      const queryKeys = queryClient
        .getQueriesData({
          queryKey: [['issues']],
        })
        .map(([queryKey]) => queryKey)

      const previousIssueData: Record<string, TIssue[]> = {}

      const updateIssues = (issues: TIssue[] | undefined) =>
        issues?.map((issue) =>
          issue.id === variables.id
            ? {
                ...issue,
                [variables.property]: variables.value,
              }
            : issue,
        )

      queryKeys.forEach((key) => {
        const issueData = queryClient.getQueryData<TIssue[]>(key)
        if (issueData) {
          previousIssueData[JSON.stringify(key)] = issueData
          queryClient.setQueryData(key, updateIssues(issueData))
        }
      })

      return { previousIssueData }
    },
    onSuccess: ({ message }) => {
      toast({
        description: message,
      })
    },
    onError: (error, variables, context) => {
      if (context?.previousIssueData) {
        Object.entries(context.previousIssueData).forEach(([key, data]) => {
          queryClient.setQueryData(JSON.parse(key), data)
        })
      }
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error.message,
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [['issues']],
      })
    },
  })
}
