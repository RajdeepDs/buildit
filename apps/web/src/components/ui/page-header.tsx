import React from "react";

export function PageHeader({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between px-4 py-2">
      <h1 className="text-base font-medium">{title}</h1>
      {children}
    </header>
  );
}
