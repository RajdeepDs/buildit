"use client";

import { useAtom } from "jotai";

import { Input } from "@buildit/ui";

import { searchQueryAtom, toggleSearchAtom } from "@/lib/store/search-issue";

export default function NavIssue() {
  const [toggleSearch] = useAtom(toggleSearchAtom);
  const setSearchQuery = useAtom(searchQueryAtom)[1];
  return (
    <nav className="border-b p-2">
      {toggleSearch ? (
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search issues"
        />
      ) : (
        <h1 className="text-sm">My issues</h1>
      )}
    </nav>
  );
}
