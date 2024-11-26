import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to create a new project.
 * @returns The mutation object.
 */
export function useCreateProject() {
  const queryClient = useQueryClient()

  return api.project.create_project.useMutation({
    onSuccess: async ({ message }) => {
      toast({
        title: 'Project created',
        description: message,
      })

      await queryClient.invalidateQueries({
        queryKey: [['project', 'get_projects'], { type: 'query' }],
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
