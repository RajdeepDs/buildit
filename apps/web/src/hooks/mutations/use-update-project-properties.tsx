import type { TProject } from '@buildit/utils/types'

import { useQueryClient } from '@tanstack/react-query'

import { sonner } from '@buildit/ui/sonner'

import ErrorNotification from '@/components/ui/toast/error'
import SuccessNotification from '@/components/ui/toast/success'
import { api } from '@/lib/trpc/react'

/**
 * Hook to update a particular property of a project.
 * @returns The mutation object.
 */
export function useUpdateProjectProperties() {
  const queryClient = useQueryClient()

  return api.project.update_project_properties.useMutation({
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [['project', 'get_projects']],
      })

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
    onSuccess: ({ message }) => {
      sonner.custom((t) => <SuccessNotification t={t} message={message} />)
    },
    onError: (error, variables, context) => {
      if (context?.previousProjectData) {
        Object.entries(context.previousProjectData).forEach(([key, data]) => {
          queryClient.setQueryData(JSON.parse(key), data)
        })
      }
      sonner.custom((t) => <ErrorNotification t={t} />)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [['project']],
      })
    },
  })
}
