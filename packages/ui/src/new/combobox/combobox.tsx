"use client";

import React from "react";

import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";

import { cn } from "../../lib/utils";

export const ComboBoxTrigger = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <Popover.Trigger asChild>
      <button className="rounded border px-3 py-0.5 text-sm">{children}</button>
    </Popover.Trigger>
  );
};

export const ComboBox = ({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Popover.Root>
  );
};

export const ComboBoxContent = ({
  children,
  className,
}: { children: React.ReactNode; className?: string | undefined }) => {
  return (
    <Popover.Portal>
      <Popover.Content
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 -slate-950 z-50 w-72 rounded-md border border-slate-200 bg-white shadow-md outline-none data-[state=closed]:animate-out data-[state=open]:animate-in dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
          className,
        )}
        sideOffset={5}
        align="start"
      >
        <Command>
          <div className="flex items-center justify-start space-x-2 border-b p-2">
            <Command.Input
              placeholder="Search..."
              className="w-full text-sm outline-none"
            />
          </div>
          <Command.List className="p-1">
            <Command.Empty className="text-sm">No results found!</Command.Empty>
            {children}
          </Command.List>
        </Command>
      </Popover.Content>
    </Popover.Portal>
  );
};

export const ComboBoxItem = React.forwardRef<
  React.ElementRef<typeof Command.Item>,
  React.ComponentPropsWithoutRef<typeof Command.Item>
>(({ className, ...props }, ref) => (
  <Command.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
      className,
    )}
    {...props}
  />
));
