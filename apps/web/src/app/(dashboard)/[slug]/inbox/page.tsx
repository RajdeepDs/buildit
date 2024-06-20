import type { Metadata } from "next";

import InboxList from "@/components/inbox/inbox-list";

export const metadata: Metadata = {
  title: "Inbox",
  description: "View and manage your inbox.",
};

export default function InboxPage() {
  return (
    <div className="flex h-svh">
      <InboxList />
      {/* TODO: Add the issue details */}
    </div>
  );
}
