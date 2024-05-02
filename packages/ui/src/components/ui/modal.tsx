"use client";

import type { Dispatch, SetStateAction } from "react";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { cn } from "../../lib/utils";

export function Modal({
  children,
  className,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  className?: string;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  preventDefaultClose?: boolean;
}) {
  return (
    <Dialog.Root open={setShowModal ? showModal : true}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border border-gray-200 bg-white p-0 shadow-xl sm:rounded-2xl",
            className,
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
