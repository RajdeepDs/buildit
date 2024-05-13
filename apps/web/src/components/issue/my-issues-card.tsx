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
    <div key={key} className="flex items-center justify-between p-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm text-gray-400">{issue.issueId}</p>
        <p className="">{issue.title}</p>
      </div>
      <div className="">
        <span className="text-sm">{updatedAt}</span>
      </div>
    </div>
  );
}
