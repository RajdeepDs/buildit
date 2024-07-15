import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@buildit/ui";
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
    <header className="flex items-center justify-between p-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Icons.home className="h-4 w-4 text-sub" />
            {team}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </header>
  );
}
