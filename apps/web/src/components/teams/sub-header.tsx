"use client";

import SearchIssue from "../issue/search-issues";
import FilterMenu from "../my-issues/filter-menu";
import DisplayMenu from "../my-issues/display-menu";
import useActiveIssuesStore from "@/lib/store/active-issues-store";

export default function SubHeader() {
  const store = useActiveIssuesStore();
  return (
    <div className="flex items-center justify-between px-4">
      <SearchIssue store={store} />
      <div className="flex space-x-2">
        <FilterMenu store={store} />
        <DisplayMenu />
      </div>
    </div>
  );
}
