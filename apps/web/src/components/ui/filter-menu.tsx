"use client";

import React from "react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

import { priorities, statuses } from "@/configs/issue-types";
import type { Store } from "@/lib/store/my-issues-store";

import CustomizeFilter from "./customize-filter";

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
    <div className="flex items-center space-x-4">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            color="secondary"
            size={"xs"}
            className="text-sub"
            StartIcon="listFilter"
          >
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuItem onClick={() => handleSelectStatus("backlog")}>
            <Icons.status className="mr-2 h-4 w-4 text-sub" />
            Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectPriority("no priority")}>
            <Icons.signalHigh className="mr-2 h-4 w-4 text-sub" />
            Priority
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {filteredStatus && (
        <CustomizeFilter
          filterType="Status"
          selectedFilter={selectedStatus!}
          onFilterChange={handleSelectStatus}
        />
      )}
      {filteredPriority && (
        <CustomizeFilter
          filterType="Priority"
          selectedFilter={selectedPriority!}
          onFilterChange={handleSelectPriority}
        />
      )}
    </div>
  );
}
