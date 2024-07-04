"use client";

import useMyIssuesStore from "@/lib/store/my-issues-store";
import SearchIssue from "../issue/search-issues";
import DisplayMenu from "./display-menu";
import FilterMenu from "./filter-menu";

export default function SubHeader() {
  const store = useMyIssuesStore();
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
