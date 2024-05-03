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
      <main>{children}</main>
    </div>
  );
}
