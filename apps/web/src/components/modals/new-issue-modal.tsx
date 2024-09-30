'use client'

import { useEffect, useState } from 'react'

import type { TTeam } from '@buildit/utils/types'
import type { CreateIssuePayload } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@buildit/ui/button'
import { CreateIssueSchema } from '@buildit/utils/validations'

import NewIssueForm from '@/components/forms/new-issue-form'
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

export const NewIssueModal = ({ children }: { children: React.ReactNode }) => {
  const { data: allTeams } = api.team.get_teams.useQuery()

  const [open, setOpen] = useState(false)
  const [openTeam, setOpenTeam] = useState(false)

  const [team, setTeam] = useState<TTeam | undefined>(undefined)

  useEffect(() => {
    if (allTeams?.length) {
      setTeam(allTeams[0])
    }
  }, [allTeams])

  const form = useForm<CreateIssuePayload>({
    resolver: zodResolver(CreateIssueSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'no priority',
    },
  })

  const onSubmit = (values: CreateIssuePayload) => {
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent

    console.log('Submitted Values:', {
      ...values,
      description: descriptionContent,
      teamId: team?.id,
    })

    localStorage.removeItem('editorContent')
    form.reset()
    setOpen(!open)
  }

  if (!allTeams) return null

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <VisuallyHide>
          <ModalTitle>Create Issue</ModalTitle>
        </VisuallyHide>
        <ModalHeader name='New issue'>
          {allTeams.length > 1 ? (
            <ComboBox open={openTeam} onOpenChange={setOpenTeam}>
              <ComboBoxTrigger>{team?.name}</ComboBoxTrigger>
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
            <p className='text-sm px-1.5 py-0.5 border rounded-md'>
              {team?.teamId}
            </p>
          )}
        </ModalHeader>
        <NewIssueForm form={form} team={team!} />
        <ModalFooter>
          <Button size={'sm'} onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
