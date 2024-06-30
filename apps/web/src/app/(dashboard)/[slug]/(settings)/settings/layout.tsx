import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Settings",
    default: "General",
  },
};

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto my-auto flex w-1/2 flex-col space-y-8 px-12">
      {children}
    </main>
  );
}
