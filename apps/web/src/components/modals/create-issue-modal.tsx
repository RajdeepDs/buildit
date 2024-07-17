"use client";

import React from "react";

import {
  Button,
  IssueModal,
  IssueModalContent,
  IssueModalHeader,
  IssueModalTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@buildit/ui";

import CreateIssueForm from "../forms/create-issue-form";

export function CreateIssueModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <IssueModal open={open} onOpenChange={setOpen}>
      <IssueModalTrigger asChild>{children}</IssueModalTrigger>
      <IssueModalContent>
        <IssueModalHeader>
          <Popover>
            <PopoverTrigger asChild>
              <Button size={"xs"} color="secondary">
                Team
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-48 flex-col"></PopoverContent>
          </Popover>
        </IssueModalHeader>
        <CreateIssueForm onOpenChange={setOpen} />
      </IssueModalContent>
    </IssueModal>
  );
}
