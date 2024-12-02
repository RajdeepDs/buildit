import { useQueryClient } from '@tanstack/react-query'

import { sonner } from '@buildit/ui/sonner'

import ErrorNotification from '@/components/ui/toast/error'
import SuccessNotification from '@/components/ui/toast/success'
import { api } from '@/lib/trpc/react'

/**
 * Hook to create a new project.
 * @returns The mutation object.
 */
export function useCreateProject() {
  const queryClient = useQueryClient()

  return api.project.create_project.useMutation({
    onSuccess: async ({ message }) => {
      sonner.custom((t) => <SuccessNotification t={t} message={message} />)
      await queryClient.invalidateQueries({ queryKey: [['project']] })
    },
    onError: () => {
      sonner.custom((t) => <ErrorNotification t={t} />)
    },
  })
}
