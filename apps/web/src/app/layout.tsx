import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "sonner";

import Provider from "@/components/Provider";

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
      <body className={inter.className}>
        <Provider>
          {children}
          <Toaster closeButton />
        </Provider>
      </body>
    </html>
  );
}
