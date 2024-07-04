"use client";

import React from "react";

import { Icons } from "@buildit/ui/icons";
import type { Store } from "@/lib/store/my-issues-store";

export default function SearchIssue({ store }: { store: Store }) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    store.setSearch(value);
  };

  return (
    <div className="border-muted flex items-center space-x-2 rounded-md border px-2 py-1">
      <Icons.search className="text-subtle h-4 w-4" />
      <input
        className="flex items-center text-sm outline-none placeholder:text-sm"
        placeholder="Search..."
        onChange={handleSearchChange}
        value={store.search}
      />
    </div>
  );
}
