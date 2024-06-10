import React from "react";

import Sidebar from "@/components/layouts/sidebar";

export const runtime = "edge";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-dvh flex bg-white">
      <Sidebar />
      <main className="flex w-full flex-grow flex-col overflow-hidden bg-white">
        {children}
      </main>
    </div>
  );
}
