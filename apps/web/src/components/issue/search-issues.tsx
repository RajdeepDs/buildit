"use client";

import React from "react";

import type { Store } from "@/lib/store/my-issues-store";
import { Button } from "@buildit/ui";
import { Icons } from "@buildit/ui/icons";

export default function SearchIssue({ store }: { store: Store }) {
  const [open, setOpen] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    store.setSearch(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button size={"icon"} color={"minimal"} onClick={() => setOpen(!open)}>
        <Icons.search className="h-4 w-4" />
      </Button>
      {open && (
        <input
          className="flex items-center text-sm outline-none placeholder:text-sm"
          placeholder="Type to search"
          onChange={handleSearchChange}
          value={store.search}
        />
      )}
    </div>
  );
}
