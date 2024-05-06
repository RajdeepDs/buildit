import React from "react";

import { Button, IssueModal } from "@buildit/ui";

export function CreateIssueModal({ children }: { children: React.ReactNode }) {
  const [isMaximized, setIsMaximized] = React.useState(false);

  const handleParentMaximize = () => {
    setIsMaximized(!isMaximized);
  };
  return (
    <IssueModal
      type="issue"
      isMaximized={isMaximized}
      onMaximize={handleParentMaximize}
      trigger={children}
    >
      <input placeholder="Issue" />
      <textarea
        placeholder="Add description..."
        className={`${isMaximized ? "h-full" : "h-full"}`}
      />
      <Button className="mt-2">Submit</Button>
    </IssueModal>
  );
}
