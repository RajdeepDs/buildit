"use client";

import React from "react";

import { Modal, ModalContent, ModalTrigger } from "@buildit/ui";

import CreateIssueForm from "../forms/create-issue-form";

export function CreateIssueModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const [isMaximized, setIsMaximized] = React.useState(false);

  const handleParentMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>{children}</ModalTrigger>
      <ModalContent
        type="issue"
        isMaximized={isMaximized}
        onMaximize={handleParentMaximize}
        needMaximize={false}
      >
        <CreateIssueForm />
      </ModalContent>
    </Modal>
  );
}
