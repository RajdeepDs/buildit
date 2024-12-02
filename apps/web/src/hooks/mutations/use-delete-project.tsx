import { useQueryClient } from '@tanstack/react-query'

import { sonner } from '@buildit/ui/sonner'

import ErrorNotification from '@/components/ui/toast/error'
import SuccessNotification from '@/components/ui/toast/success'
import { api } from '@/lib/trpc/react'

/**
 * Hook to delete a project.
 * @returns The mutation object.
 */
export function useDeleteProject() {
  const queryClient = useQueryClient()

  return api.project.delete_project.useMutation({
    onSuccess: async () => {
      sonner.custom((t) => (
        <SuccessNotification t={t} message={'Project deleted successfully.'} />
      ))
      await queryClient.invalidateQueries({ queryKey: [['project']] })
    },
    onError: () => {
      sonner.custom((t) => <ErrorNotification t={t} />)
    },
  })
}
