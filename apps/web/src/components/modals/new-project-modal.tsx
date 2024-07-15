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

import React from "react";
import NewProjectForm from "../forms/new-project-form";

export const NewProjectModal = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button StartIcon="plus" size={"sm"}>
          New project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Create a new project</DialogDescription>
        </DialogHeader>
        <NewProjectForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
