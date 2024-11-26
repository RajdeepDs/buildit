import { useQueryClient } from '@tanstack/react-query'

import { toast } from '@buildit/ui/toast'

import { api } from '@/lib/trpc/react'

/**
 * Hook to delete a team.
 * @returns The mutation object.
 */
export function useDeleteTeam() {
  const queryClient = useQueryClient()

  return api.team.delete_team.useMutation({
    onSuccess: async () => {
      toast({
        description: 'Team deleted!',
      })
      await queryClient.invalidateQueries({
        queryKey: [['team', 'get_teams'], { type: 'query' }],
      })
    },
    onError: () => {
      toast({
        description: 'Error deleting team!',
      })
    },
  })
}
