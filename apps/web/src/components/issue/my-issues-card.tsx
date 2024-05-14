import { formatDate } from "@/lib/utils/date";
import type { TIssue } from "@/types";

export default function MyIssuesCard({
  issue,
  key,
}: {
  issue: TIssue;
  key: TIssue["id"];
}): JSX.Element {
  const updatedAt = issue?.updatedAt && formatDate(issue?.updatedAt);
  return (
    <div
      key={key}
      className="flex cursor-pointer items-center justify-between border-x-0 border-b-[0.1px] p-2 hover:bg-gray-100/50"
    >
      <div className="flex items-center space-x-2">
        <p className="text-sm text-gray-400">{issue.issueId}</p>
        <p className="">{issue.title}</p>
      </div>
      <div className="">
        <span className="text-sm text-gray-400">{updatedAt}</span>
      </div>
    </div>
  );
}
