'use client'

import React from 'react'

import type { ReactNode } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@buildit/ui/dialog'

import NewTeamForm from '@/components/forms/new-team-form'

export const NewTeamModal = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
