import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to delete a project.
 * @returns The mutation object.
 */
export function useDeleteProject() {
  const queryClient = useQueryClient()

  return api.project.delete_project.useMutation({
    onSuccess: async () => {
      toast({
        description: 'Project deleted successfully!',
      })
      await queryClient.invalidateQueries({ queryKey: [['project']] })
    },
    onError: ({ message }) => {
      toast({
        variant: 'destructive',
        title: 'Error deleting project!',
        description: message || 'Something went wrong.',
      })
    },
  })
}
