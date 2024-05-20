import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "./prosemirror.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuildIt",
  description: "An open source collaborative project management tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
