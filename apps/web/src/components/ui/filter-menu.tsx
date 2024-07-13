"use client";

import React from "react";

import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { priorities, statuses } from "@/configs/issue-types";
import type { Store } from "@/lib/store/my-issues-store";

export default function FilterMenu({ store }: { store: Store }) {
  const [open, setOpen] = React.useState(false);

  const handleSelectStatus = (status: string) => {
    store.setFilterByStatus(status);
    setOpen(false);
  };

  const handleSelectPriority = (priority: string) => {
    store.setFilterByPriority(priority);
    setOpen(false);
  };

  const filteredStatus = store.filterByStatus;
  const filteredPriority = store.filterByPriority;

  const selectedStatus = statuses.find(
    (status) => status.value === filteredStatus,
  )?.label;

  const selectedPriority = priorities.find(
    (priority) => priority.value === filteredPriority,
  )?.label;

  return (
    <div className="flex items-center space-x-8">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            color="secondary"
            size={"sm"}
            className="text-sub"
            StartIcon="listFilter"
          >
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.status className="mr-2 h-4 w-4 text-sub" />
              Status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Command className="w-[200px]">
                <CommandInput placeholder="Filter status..." autoFocus={true} />
                <CommandList>
                  <CommandEmpty>No status</CommandEmpty>
                  <CommandGroup>
                    {statuses.map((status) => {
                      const Icon = Icons[status.icon as keyof typeof Icons];
                      return (
                        <CommandItem
                          key={status.label}
                          value={status.value.toString()}
                          onSelect={() => handleSelectStatus(status.value)}
                        >
                          <Icon className="mr-2 h-4 w-4 text-sub" />
                          {status.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.signalHigh className="mr-2 h-4 w-4 text-sub" />
              Priority
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Command className="w-[200px]">
                <CommandInput
                  placeholder="Filter priority..."
                  autoFocus={true}
                />
                <CommandList>
                  <CommandEmpty>No priority</CommandEmpty>
                  <CommandGroup>
                    {priorities.map((priority) => {
                      const Icon = Icons[priority.icon as keyof typeof Icons];
                      return (
                        <CommandItem
                          key={priority.label}
                          value={priority.value}
                          onSelect={() => {
                            handleSelectPriority(priority.value);
                          }}
                        >
                          <Icon className="mr-2 h-4 w-4 text-sub" />
                          {priority.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Icons.hexagon className="mr-2 h-4 w-4 text-sub" />
            Project
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.tag className="mr-2 h-4 w-4 text-sub" />
            Labels
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {filteredStatus && (
        <Badge size={"md"} variant={"gray"}>
          {selectedStatus}
          <Icons.canceled
            className="ml-2 h-4 w-4 cursor-pointer text-soft"
            onClick={() => store.setFilterByStatus("")}
          />
        </Badge>
      )}
      {filteredPriority && (
        <Badge size={"md"} variant={"gray"}>
          {selectedPriority}
          <Icons.canceled
            className="ml-2 h-4 w-4 cursor-pointer text-soft"
            onClick={() => store.setFilterByPriority("")}
          />
        </Badge>
      )}
    </div>
  );
}
