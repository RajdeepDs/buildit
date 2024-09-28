'use client'

import { useState } from 'react'

import { Button } from '@buildit/ui/button'

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
  VisuallyHide,
} from '@/components/ui/modal'
import { api } from '@/lib/trpc/react'

import NewIssueForm from '../forms/new-issue-form'

export const NewIssueModal = ({ children }: { children: React.ReactNode }) => {
  const { data: teams, isLoading } = api.team.get_teams.useQuery()
  const [open, setOpen] = useState(false)
  const [openTeam, setOpenTeam] = useState(false)

  const [team, setTeam] = useState(teams?.at(0))

  if (isLoading) return <></>

  console.log(teams?.at(0))

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <VisuallyHide>
          <ModalTitle>Create Issue</ModalTitle>
        </VisuallyHide>
        <ModalHeader name='New issue'>
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
        <NewIssueForm />
        <ModalFooter>
          <Button size={'sm'}>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
