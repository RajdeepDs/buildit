"use client";

import { useAtom } from "jotai";
import React from "react";

import { Icons } from "@buildit/ui/icons";

import { searchQueryAtom } from "@/lib/store/search-issue";

export default function SearchIssue() {
  const setSearchQuery = useAtom(searchQueryAtom)[1];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <div className="border-muted flex items-center space-x-2 rounded-md border px-2 py-1">
      <Icons.search className="text-subtle h-4 w-4" />
      <input
        className="flex items-center text-sm outline-none placeholder:text-sm"
        placeholder="Search..."
        onChangeCapture={handleSearchChange}
      />
    </div>
  );
}
