'use client'

import React, { useEffect, useState } from 'react'

import type { TTeam } from '@buildit/utils/types'

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
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@/components/ui/modal'
import { api } from '@/lib/trpc/react'

export const NewProjectModal = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: allTeams } = api.team.get_teams.useQuery()

  const [open, setOpen] = React.useState(false)
  const [openTeam, setOpenTeam] = React.useState(false)

  const [team, setTeam] = useState<TTeam | undefined>(undefined)

  useEffect(() => {
    if (allTeams?.length) {
      setTeam(allTeams[0])
    }
  }, [allTeams])

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
        <NewProjectForm team={team} onOpenChange={setOpen} />
      </ModalContent>
    </Modal>
  )
}
