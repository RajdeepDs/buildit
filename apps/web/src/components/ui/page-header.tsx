import React from "react";

import { Icons } from "@buildit/ui/icons";

export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <h1 className="font-medium text-base">{title}</h1>
      {children}
    </header>
  );
}

export function TeamsPageHeader({
  team,
  title,
  children,
}: {
  team: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-2">
        <h1 className="font-medium text-base">{team}</h1>
        <Icons.chevronRight className="h-4 w-4 text-subtle" />
        <p className="text-sm text-subtle">{title}</p>
      </div>
      {children}
    </header>
  );
}
