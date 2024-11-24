'use client'

import { useEffect, useState } from 'react'

import type { TTeam } from '@buildit/utils/types'
import type { CreateIssuePayload } from '@buildit/utils/validations'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@buildit/ui/button'
import { toast } from '@buildit/ui/toast'
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
} from '@/components/ui/modal'
import { useProjects } from '@/hooks/data/use-projects'
import { useTeams } from '@/hooks/data/use-teams'
import { useCreateIssue } from '@/hooks/mutations/use-create-issue'

export const NewIssueModal = ({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode
  defaultValues?: Partial<CreateIssuePayload>
}) => {
  const { data: allTeams } = useTeams()
  const { data: allProjects } = useProjects()
  const { mutate: createIssue } = useCreateIssue()

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
      ...defaultValues,
    },
  })

  const onSubmit = (values: CreateIssuePayload) => {
    const localContent = localStorage.getItem('editorContent')
    const descriptionContent = localContent

    if (!team) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
        description: 'Team not found',
      })
      return
    }

    createIssue({
      title: values.title,
      description: descriptionContent,
      status: values.status,
      priority: values.priority,
      assigneeId: values.assigneeId,
      projectId: values.projectId,
      teamId: team.id,
    })

    localStorage.removeItem('editorContent')
    form.reset()
    setOpen(!open)
  }

  const handleSubmit = form.handleSubmit(onSubmit, (errors) => {
    const error = errors.title?.message
    if (error) {
      toast({
        title: error,
        description: 'Please enter a title before submitting',
      })
    }
  })

  if (!allTeams || !allProjects || !team) return null

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent>
        <ModalTitle className='sr-only'>Create Issue</ModalTitle>
        <ModalHeader name='New issue'>
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
        <NewIssueForm form={form} team={team} projects={allProjects} />
        <ModalFooter className='pt-2'>
          <Button size={'sm'} onClick={handleSubmit}>
            Create issue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
