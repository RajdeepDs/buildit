"use client";

import IssueItem from "./issue-item";

import { useEffect, useState } from "react";
import type { TIssues } from "@/types";

import type { Store } from "@/lib/store/my-issues-store";
import { CreateIssueModal } from "../modals/create-issue-modal";
import { Button } from "@buildit/ui";

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
    <div className="h-full">
      {issues.length === 0 ? (
        <div className="flex h-1/2 w-full flex-col items-center justify-center space-y-4 rounded-lg">
          <div className="flex flex-col items-center">
            <h1 className="text-default font-cal text-xl">No issues found</h1>
            <p className="text-subtle text-sm">
              There aren&apos;t any issues at the moment. Create one to get
              started!{" "}
            </p>
          </div>
          <CreateIssueModal>
            <Button StartIcon="plus">Create issue</Button>
          </CreateIssueModal>
        </div>
      ) : (
        <ul className="list-none">
          {filteredIssues?.map((issue) => (
            <li key={issue.id}>
              <IssueItem issue={issue} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
