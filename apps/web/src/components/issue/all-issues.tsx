"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Button } from "@buildit/ui";

import { getIssues } from "@/lib/data/issues/get-issues";

import type { TIssues } from "@/types";
import { CreateIssueModal } from "../modals/create-issue-modal";
import MyIssuesCard from "./my-issues-card";

import useMyIssuesStore from "@/lib/store/my-issues-store";

export default function AllIssues() {
  const store = useMyIssuesStore();

  const { data: allIssues, error } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => getIssues(),
    refetchInterval: 4 * 1000,
  });

  const [filteredIssues, setFilteredIssues] = useState<TIssues>([]);

  const filteredStatus = store.filterByStatus;

  useEffect(() => {
    const filtered = allIssues?.filter((issue) => {
      if (filteredStatus && filteredStatus !== "") {
        return issue.status === filteredStatus;
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
      setFilteredIssues(filtered || allIssues || []);
    }
  }, [allIssues, filteredStatus, store.search]);

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="h-full">
      {filteredIssues?.length === 0 ? (
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
          {filteredIssues.map((issue) => (
            <li key={issue.id}>
              <MyIssuesCard issue={issue} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
