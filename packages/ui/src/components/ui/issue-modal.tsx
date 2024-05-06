"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Icons } from "../../icons";

export const IssueModal = ({
  children,
  trigger,
  type,
  isMaximized,
  onMaximize,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  type: "project" | "issue";
  isMaximized?: boolean;
  onMaximize?: () => void;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/10" />
        <Dialog.Content
          className={`data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[10%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[10%] fixed left-[50%] top-[20%] z-50 h-full max-h-72 w-full max-w-2xl translate-x-[-50%] translate-y-[-10%] border border-slate-200 bg-white p-4 shadow-lg duration-200 dark:border-slate-800 dark:bg-slate-950 sm:rounded-lg ${
            isMaximized && "max-h-[700px] max-w-3xl"
          }`}
          asChild
        >
          <div>
            <div className="flex h-fit items-center justify-between">
              <div className="flex">
                {/* TODO: Add workspace Identifier Name and chevronRight Icon [eg: `BLDT` > New issue] */}
                <h2 className="text-sm text-gray-700">
                  {type === "project" ? "New project" : "New issue"}
                </h2>
              </div>
              <div className="flex gap-x-2">
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
                <Dialog.Close className="h-5 w-5 rounded-sm opacity-70 transition-opacity hover:bg-gray-200 hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-slate-500 data-[state=open]:text-slate-500">
                  <Cross2Icon className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </div>
            </div>
            <div className="flex h-full flex-col pb-5">{children}</div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
