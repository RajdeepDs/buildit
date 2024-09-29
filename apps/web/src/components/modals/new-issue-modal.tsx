'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { Button } from '@buildit/ui/button'
import { CreateIssueSchema } from '@buildit/utils/validations'

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
  const { data: teams } = api.team.get_teams.useQuery()

  const [open, setOpen] = useState(false)
  const [openTeam, setOpenTeam] = useState(false)

  const [team, setTeam] = useState(teams?.at(0))

  const form = useForm<z.infer<typeof CreateIssueSchema>>({
    resolver: zodResolver(CreateIssueSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'no priority',
    },
  })

  const onSubmit = (values: z.infer<typeof CreateIssueSchema>) => {
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent
    if (!values.title) {
      console.error('Title is required.')
    } else {
      console.log('Submitted Values:', {
        ...values,
        description: descriptionContent,
      })
    }
    localStorage.removeItem('editorContent')
    form.reset()
    setOpen(!open)
  }

  if (!teams) return null

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <VisuallyHide>
          <ModalTitle>Create Issue</ModalTitle>
        </VisuallyHide>
        <ModalHeader name='New issue'>
          {teams.length > 1 ? (
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
            <p className='text-sm px-1.5 py-0.5 border rounded-md'>
              {team?.teamId}
            </p>
          )}
        </ModalHeader>
        <NewIssueForm form={form} />
        <ModalFooter>
          <Button size={'sm'} onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
