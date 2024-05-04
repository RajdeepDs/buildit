"use client";

import { useParams } from "next/navigation";

import IssueCard from "@/components/issue/issue-card";

export default function IssueClientPage() {
  const { id } = useParams() as { id: string };
  return <IssueCard issueId={id} />;
}
