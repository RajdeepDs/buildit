"use client";

import IssueItem from "./issue-item";

import { useEffect, useState } from "react";
import type { TIssues } from "@/types";

import type { Store } from "@/lib/store/my-issues-store";

export default function IssuesByTeam({
  store,
  issues,
}: { store: Store; issues: TIssues }) {
  const [filteredIssues, setFilteredIssues] = useState<TIssues>([]);

  const filteredStatus = store.filterByStatus;
  const filteredPriority = store.filterByPriority;

  useEffect(() => {
    const filtered = issues?.filter((issue) => {
      if (filteredStatus && filteredStatus !== "") {
        return issue.status === filteredStatus;
      }
      if (filteredPriority && filteredPriority !== "") {
        return issue.priority === filteredPriority;
      }
      return true;
    });

    if (store.search) {
      setFilteredIssues(
        filtered?.filter((issue) =>
          issue.title.toLowerCase().includes(store.search.toLowerCase()),
        ) || [],
      );
    } else {
      setFilteredIssues(filtered || issues || []);
    }
  }, [issues, filteredStatus, filteredPriority, store.search]);

  return (
    <div>
      <ul className="list-none">
        {filteredIssues?.map((issue) => (
          <li key={issue.id}>
            <IssueItem issue={issue} />
          </li>
        ))}
      </ul>
    </div>
  );
}
