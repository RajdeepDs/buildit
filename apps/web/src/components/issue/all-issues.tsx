"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@buildit/ui";

import { getIssues } from "@/lib/data/issues/get-issues";
import { CreateIssueModal } from "../modals/create-issue-modal";
import MyIssuesCard from "./my-issues-card";

export default function AllIssues() {
  const { data, error } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => getIssues(),
  });

  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="h-full">
      {data?.length === 0 ? (
        <div className="flex h-1/2 w-full flex-col items-center justify-center space-y-4 rounded-lg border">
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
        data?.map((issue) => <MyIssuesCard key={issue.id} issue={issue} />)
      )}
    </div>
  );
}
