'use client'

import React from 'react'

import {
  ComboBox,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxTrigger,
} from '@/components/ui/combo-box'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  VisuallyHide,
} from '@/components/ui/modal'
import { api } from '@/lib/trpc/react'

import NewProjectForm from '../forms/new-project-form'

export const NewProjectModal = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: teams, isLoading } = api.team.get_teams.useQuery()

  const [open, setOpen] = React.useState(false)
  const [openTeam, setOpenTeam] = React.useState(false)

  const [team, setTeam] = React.useState(teams?.[0])

  if (isLoading) return <></>

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <VisuallyHide>
          <ModalTitle>Create Project</ModalTitle>
        </VisuallyHide>
        <ModalHeader name='New project'>
          {teams && teams.length > 1 ? (
            <ComboBox open={openTeam} onOpenChange={setOpenTeam}>
              <ComboBoxTrigger>{team?.name}</ComboBoxTrigger>
              <ComboBoxContent className='w-[200px]'>
                {teams.map((team) => (
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
            <p className='text-sm'>{team?.name}</p>
          )}
        </ModalHeader>
        <NewProjectForm team={team} onOpenChange={setOpen} />
      </ModalContent>
    </Modal>
  )
}
