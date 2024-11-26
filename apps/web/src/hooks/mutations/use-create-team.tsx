import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to create a new team.
 * @returns The mutation object.
 */
export function useCreateTeam() {
  const queryClient = useQueryClient()

  return api.team.create_team.useMutation({
    onSuccess: async ({ message }) => {
      toast({
        title: 'Team created',
        description: message,
      })

      await queryClient.invalidateQueries({
        queryKey: [['team', 'get_teams'], { type: 'query' }],
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
