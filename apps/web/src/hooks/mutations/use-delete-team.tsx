import { useQueryClient } from '@tanstack/react-query'

import { sonner } from '@buildit/ui/sonner'

import ErrorNotification from '@/components/ui/toast/error'
import SuccessNotification from '@/components/ui/toast/success'
import { api } from '@/lib/trpc/react'

/**
 * Hook to delete a team.
 * @returns The mutation object.
 */
export function useDeleteTeam() {
  const queryClient = useQueryClient()

  return api.team.delete_team.useMutation({
    onSuccess: async () => {
      sonner.custom((t) => (
        <SuccessNotification t={t} message={'Team deleted successfully.'} />
      ))
      await queryClient.invalidateQueries({
        queryKey: [['team', 'get_teams'], { type: 'query' }],
      })
    },
    onError: () => {
      sonner.custom((t) => <ErrorNotification t={t} />)
    },
  })
}
