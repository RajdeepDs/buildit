"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

import { Icons } from "../../icons";
import { cn } from "../../lib/utils";

export const ModalTrigger = Dialog.Trigger;

export const Modal = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

export const ModalContent = ({
  children,
  className,
  type,
  needMaximize,
  isMaximized,
  onMaximize,
}: {
  children: React.ReactNode;
  className?: string | undefined;
  type: "issue" | "project";
  needMaximize?: boolean;
  isMaximized?: boolean;
  onMaximize?: () => void;
}) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/10 data-[state=closed]:animate-out data-[state=open]:animate-in" />
      <Dialog.Content
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[10%] fixed top-[20%] left-[50%] z-50 max-h-[650px] w-full max-w-2xl translate-x-[-50%] translate-y-[-10%] border border-slate-200 bg-white p-4 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg dark:border-slate-800 dark:bg-slate-950",
          className,
        )}
      >
        <div className="flex flex-col">
          <div className="mb-4 flex justify-between">
            <h1 className="text-gray-700 text-sm">
              {type === "issue" ? "New issue" : "New project"}
            </h1>
            <div className="flex gap-x-2">
              {needMaximize && (
                <button
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm opacity-70 transition-opacity hover:bg-gray-200 hover:opacity-100 data-[state=open]:bg-slate-500 data-[state=open]:text-slate-500"
                  onClick={() => (onMaximize ? onMaximize() : {})}
                >
                  {isMaximized ? (
                    <>
                      <Icons.minimize className="h-4 w-4" />
                      <span className="sr-only">Minimize</span>
                    </>
                  ) : (
                    <>
                      <Icons.maximize className="h-4 w-4" />
                      <span className="sr-only">Maximize</span>
                    </>
                  )}
                </button>
              )}
              <Dialog.Close className="h-5 w-5 rounded-sm opacity-70 transition-opacity hover:bg-gray-200 hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-slate-500 data-[state=open]:text-slate-500">
                <Cross2Icon className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>
          </div>
          {children}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
