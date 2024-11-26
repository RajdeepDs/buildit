import type { TProject } from '@buildit/utils/types'

import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to update a particular property of a project.
 * @returns The mutation object.
 */
export function useUpdateProjectProperties() {
  const queryClient = useQueryClient()

  return api.project.update_project_properties.useMutation({
    onMutate: async (variables) => {
      // Cancel ongoing queries to prevent conflicts
      await queryClient.cancelQueries({
        queryKey: [['project', 'get_projects']],
      })

      await queryClient.cancelQueries({
        queryKey: [['project', 'get_projects_by_teams']],
      })

      // Get all active queries matching project keys
      const queryKeys = queryClient
        .getQueriesData({
          queryKey: [['project']],
        })
        .map(([queryKey]) => queryKey)

      const previousProjectData: Record<string, TProject[]> = {}

      const updateProjects = (projects: TProject[] | undefined) =>
        projects?.map((project) =>
          project.id === variables.id
            ? {
                ...project,
                [variables.property]: variables.value,
              }
            : project,
        )

      // Update cache for all matching queries
      queryKeys.forEach((key) => {
        const projectData = queryClient.getQueryData<TProject[]>(key)
        if (projectData) {
          previousProjectData[JSON.stringify(key)] = projectData
          queryClient.setQueryData(key, updateProjects(projectData))
        }
      })

      return { previousProjectData }
    },
    onError: (error, variables, context) => {
      // Revert cache to previous state in case of an error
      if (context?.previousProjectData) {
        Object.entries(context.previousProjectData).forEach(([key, data]) => {
          queryClient.setQueryData(JSON.parse(key), data)
        })
      }

      // Display an error message
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error.message,
      })
    },
    onSettled: async () => {
      // Invalidate all related queries to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: [['project']],
      })
    },
  })
}
