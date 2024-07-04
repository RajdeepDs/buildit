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

  const filteredStatus = store.filterByStatus;

  const selectedStatus = statuses.find(
    (status) => status.value === filteredStatus,
  )?.label;

  return (
    <div className="flex items-center space-x-8">
      {filteredStatus && (
        <Badge size={"md"} variant={"gray"}>
          {selectedStatus}
          <Icons.canceled
            className="text-subtle ml-2 h-4 w-4 cursor-pointer"
            onClick={() => store.setFilterByStatus("")}
          />
        </Badge>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} color="minimal">
            <Icons.filter className="text-subtle active:text-emphasis h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icons.status className="text-subtle mr-2 h-4 w-4 stroke-2" />
              Status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Command className="w-[150px]">
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
                          <Icon className="text-subtle mr-2 h-4 w-4 stroke-2" />
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
              <Icons.signalHigh className="text-subtle mr-2 h-4 w-4 stroke-2" />
              Priority
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Command className="w-[150px]">
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
                            setOpen(false);
                          }}
                        >
                          <Icon className="text-subtle mr-2 h-4 w-4 stroke-2" />
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
            <Icons.hexagon className="text-subtle mr-2 h-4 w-4 stroke-2" />
            Project
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.tag className="text-subtle mr-2 h-4 w-4 stroke-2" />
            Labels
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
