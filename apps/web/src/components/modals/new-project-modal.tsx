'use client'

import React, { useEffect, useState } from 'react'

import type { TTeam } from '@buildit/utils/types'
import type { CreateProjectPayload } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@buildit/ui/button'
import { sonner } from '@buildit/ui/sonner'
import { CreateProjectSchema } from '@buildit/utils/validations'

import NewProjectForm from '@/components/forms/new-project-form'
import {
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
} from '@/components/ui/combo-box'
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/ui/modal'
import ErrorNotification from '@/components/ui/toast/error'
import WarningNotification from '@/components/ui/toast/warning'
import { useTeams } from '@/hooks/data/use-teams'
import { useCreateProject } from '@/hooks/mutations/use-create-project'

export const NewProjectModal = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode
  defaultValues?: Partial<CreateProjectPayload>
}) => {
  const [open, setOpen] = React.useState(false)
  const [openTeam, setOpenTeam] = React.useState(false)

  const { data: allTeams } = useTeams()
  const mutation = useCreateProject()

  const [team, setTeam] = useState<TTeam | undefined>(undefined)

  useEffect(() => {
    if (allTeams?.length) {
      setTeam(allTeams[0])
    }
  }, [allTeams])

  const form = useForm<CreateProjectPayload>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'planned',
      priority: 'no priority',
      ...defaultValues,
    },
  })

  const onSubmit = (values: CreateProjectPayload) => {
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent

    if (!team) {
      sonner.custom((t) => <ErrorNotification t={t} />)
      return
    }

    mutation.mutate({
      ...values,
      description: descriptionContent,
      teamId: team.id,
    })

    localStorage.removeItem('editorContent')
    form.reset()
    setOpen(!open)
  }

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    const error = errors.name?.message

    if (error) {
      sonner.custom((t) => <WarningNotification t={t} message={error} />)
    }
  })

  if (!allTeams || !team) return null

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <ModalTitle className='sr-only'>Create Project</ModalTitle>
        <ModalHeader name='New project'>
          {allTeams.length > 1 ? (
            <ComboBox open={openTeam} onOpenChange={setOpenTeam}>
              <ComboBoxTrigger>{team.name}</ComboBoxTrigger>
              <ComboBoxContent className='w-[200px]'>
                {allTeams.map((team) => (
                  <ComboBoxItem
                    key={team.id}
                    onSelect={() => {
                      setTeam(team)
                      setOpenTeam(false)
                    }}
                  >
                    {team.name}
                  </ComboBoxItem>
                ))}
              </ComboBoxContent>
            </ComboBox>
          ) : (
            <p className='text-sm px-1.5 py-0.5 border rounded-md select-none'>
              {team.teamId}
            </p>
          )}
        </ModalHeader>
        <NewProjectForm form={form} team={team} />
        <ModalFooter className='pt-2'>
          <Button size={'sm'} onClick={handleSubmit}>
            Create project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
