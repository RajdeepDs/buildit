import React from "react";

import Sidebar from "@/components/layouts/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-dvh flex">
      <Sidebar />
      <main className="h-dvh w-full bg-gray-100">{children}</main>
    </div>
  );
}
