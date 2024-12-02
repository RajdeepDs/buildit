import { useQueryClient } from '@tanstack/react-query'

import { sonner } from '@buildit/ui/sonner'

import ErrorNotification from '@/components/ui/toast/error'
import SuccessNotification from '@/components/ui/toast/success'
import { api } from '@/lib/trpc/react'

/**
 * Hook to create a new team.
 * @returns The mutation object.
 */
export function useCreateTeam() {
  const queryClient = useQueryClient()

  return api.team.create_team.useMutation({
    onSuccess: async ({ message }) => {
      sonner.custom((t) => <SuccessNotification t={t} message={message} />)

      await queryClient.invalidateQueries({
        queryKey: [['team', 'get_teams'], { type: 'query' }],
      })
    },
    onError: () => {
      sonner.custom((t) => <ErrorNotification t={t} />)
    },
  })
}
