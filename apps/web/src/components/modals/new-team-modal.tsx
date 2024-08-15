'use client'

import React from 'react'

import { Button } from '@buildit/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@buildit/ui/dialog'

import NewTeamForm from '@/components/forms/new-team-form'
import { Icons } from '@/components/ui/icons'

export const NewTeamModal = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'}>
          <Icons.plus className='h-4 w-4 mr-2 text-white' />
          New team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Team</DialogTitle>
          <DialogDescription>Create a new team</DialogDescription>
        </DialogHeader>
        <NewTeamForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
