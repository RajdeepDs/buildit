import type { TProject } from '@buildit/utils/types'

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
    onMutate: async (newProject) => {
      // Cancel ongoing queries to avoid conflicts
      await queryClient.cancelQueries({ queryKey: [['project']] })

      // Optimistically add the new project to cached queries
      const queryKeys = queryClient
        .getQueriesData({
          queryKey: [['project']],
        })
        .map(([queryKey]) => queryKey)

      const previousProjectData: Record<string, TProject[]> = {}

      queryKeys.forEach((key) => {
        const projects = queryClient.getQueryData<TProject[]>(key)
        if (projects) {
          previousProjectData[JSON.stringify(key)] = projects
          queryClient.setQueryData(key, [...projects, newProject])
        }
      })

      return { previousProjectData }
    },
    onError: (error, variables, context) => {
      // Revert cache to previous state if mutation fails
      if (context?.previousProjectData) {
        Object.entries(context.previousProjectData).forEach(([key, data]) => {
          queryClient.setQueryData(JSON.parse(key), data)
        })
      }

      // Show a detailed error toast
      toast({
        variant: 'destructive',
        title: 'Error creating project!',
        description: error.message || 'Something went wrong.',
      })
    },
    onSuccess: async (data) => {
      // Show a success toast
      toast({
        title: 'Project created',
        description: data.message,
      })

      // Invalidate all queries related to projects to refresh data
      await queryClient.invalidateQueries({ queryKey: [['project']] })
    },
  })
}
