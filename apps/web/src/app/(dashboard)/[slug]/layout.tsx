import React from "react";

import Sidebar from "@/components/layouts/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-dvh flex bg-gray-100">
      <Sidebar />
      <main className="m-2 w-full rounded-md border bg-white">{children}</main>
    </div>
  );
}
