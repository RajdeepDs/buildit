"use client";

import { Store } from "@/lib/store/my-issues-store";
import SearchIssue from "../issue/search-issues";
import DisplayMenu from "./display-menu";
import FilterMenu from "./filter-menu";

export default function SubHeader({ store }: { store: Store }) {
  return (
    <div className="flex flex-1 items-center justify-between">
      <FilterMenu store={store} />
      <div className="flex space-x-2">
        <SearchIssue store={store} />
        <DisplayMenu />
      </div>
    </div>
  );
}
