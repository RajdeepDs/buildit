"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type IssueProp = {
  issue: {
    id: string;
    title: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    status: "open" | "in-progress" | "closed" | null;
    priority: "low" | "medium" | "high" | null;
    reporterId: string | null;
    assigneeId: string | null;
    workspaceId: string | null;
    issueId: string;
  };
};

export default function Issue({ issue }: IssueProp) {
  const { slug } = useParams() as { slug?: string };
  const issueId: string = issue.issueId;
  return (
    <Link
      key={issue.id}
      className="flex gap-2"
      href={`/${slug}/issue/${issueId}`}
    >
      <h1>{issue.issueId}</h1>
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
    </Link>
  );
}
