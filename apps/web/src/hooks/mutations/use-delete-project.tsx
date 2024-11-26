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
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [['project']] })

      const queryKeys = queryClient
        .getQueriesData({
          queryKey: [['project']],
        })
        .map(([queryKey]) => queryKey)

      const previousProjectData: Record<string, any> = {}

      queryKeys.forEach((key) => {
        const projects = queryClient.getQueryData<{ id: string }[]>(key)
        if (projects) {
          previousProjectData[JSON.stringify(key)] = projects
          const updatedProjects = projects.filter(
            (project) => project.id !== variables.projectId,
          )
          queryClient.setQueryData(key, updatedProjects)
        }
      })

      return { previousProjectData }
    },
    onError: (error, variables, context) => {
      if (context?.previousProjectData) {
        Object.entries(context.previousProjectData).forEach(([key, data]) => {
          queryClient.setQueryData(JSON.parse(key), data)
        })
      }

      toast({
        variant: 'destructive',
        title: 'Error deleting project!',
        description: error.message || 'Something went wrong.',
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [['project']] })

      toast({
        description: 'Project deleted successfully!',
      })
    },
  })
}
