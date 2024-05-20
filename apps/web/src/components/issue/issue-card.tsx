import { useState } from "react";
import type { JSONContent } from "novel";

import { defaultValue } from "@/app/defaultValue";
import useIssue from "@/lib/swr/use-issue";
import Editor from "../editor/advanced-editor";

export default function IssueCard({
  issueId,
}: {
  issueId: string;
}): JSX.Element {
  const { issue, isLoading, error } = useIssue(issueId);
  const [value, setValue] = useState<JSONContent>(defaultValue);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading issue</p>;
  console.log(value);
  return (
    <div className="flex h-full">
      <div className="mx-auto w-3/6">
        <div className="mt-12">
          {/* <h1 className="text-2xl font-semibold">{issue?.title}</h1>
          <p className="mt-5">{issue?.description}</p> */}
          <Editor initialValue={value} onChange={setValue} />
        </div>
      </div>
      <div className="w-[250px] border-l p-2">
        <h1 className="text-sm font-medium">Propertise</h1>
        <div className="mt-5 space-y-4">
          <p className="capitalize">
            <span className="mr-1 font-medium">Status:</span>
            {issue?.status}
          </p>
          <p className="capitalize">
            <span className="mr-1 font-medium">Priority:</span>
            {issue?.priority}
          </p>
          <p className="">
            <span className="mr-1 font-medium">Reporter ID:</span>
            {issue?.reporterId}
          </p>
        </div>
      </div>
    </div>
  );
}
