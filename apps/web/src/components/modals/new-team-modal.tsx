"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@buildit/ui";

import NewTeamForm from "../forms/new-team-form";
import React from "react";

export const NewTeamModal = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button StartIcon="plus" size={"sm"}>
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
  );
};
