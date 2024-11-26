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
      await queryClient.cancelQueries({
        queryKey: [['project', 'get_projects'], { type: 'query' }],
      })
      const previousProjects = queryClient.getQueryData<TProject[]>([
        'project',
        'get_projects',
      ])
      if (previousProjects) {
        const updatedProjects = previousProjects.map((project) =>
          project.id === variables.id
            ? {
                ...project,
                [variables.property]: variables.value,
              }
            : project,
        )
        queryClient.setQueryData(['project', 'get_projects'], updatedProjects)
      }
      return { previousProjects }
    },
    onError: (error, variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(
          ['project', 'get_projects'],
          context.previousProjects,
        )
      }

      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: error.message,
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [['project', 'get_projects'], { type: 'query' }],
      })
    },
  })
}
