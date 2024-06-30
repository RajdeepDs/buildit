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
      <h1 className="text-base font-medium">{title}</h1>
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
        <h1 className="text-base font-medium">{team}</h1>
        <Icons.chevronRight className="text-subtle h-4 w-4" />
        <p className="text-subtle text-sm">{title}</p>
      </div>
      {children}
    </header>
  );
}
