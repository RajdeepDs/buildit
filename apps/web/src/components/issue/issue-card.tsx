import { BlockEditor } from "@buildit/editor";

import useIssue from "@/lib/swr/use-issue";

export default function IssueCard({
  issueId,
}: {
  issueId: string;
}): JSX.Element {
  const { issue, isLoading, error } = useIssue(issueId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading issue</p>;
  return (
    <div className="flex h-full">
      <div className="mx-auto w-3/6">
        <div className="mt-12">
          <h1 className="text-2xl font-semibold">{issue?.title}</h1>
          <BlockEditor content={issue?.description} />
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
