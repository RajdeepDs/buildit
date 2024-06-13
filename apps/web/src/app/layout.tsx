import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

import { Toaster } from "sonner";

import Provider from "@/components/Provider";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
});
const calFont = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  preload: true,
  display: "block",
  weight: "600",
});

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
      <head>
        <style>{`
          :root {
            --font-inter: ${interFont.style.fontFamily.replace(/\'/g, "")};
            --font-cal: ${calFont.style.fontFamily.replace(/\'/g, "")};
          }
        `}</style>
      </head>
      <body>
        <Provider>
          {children}
          <Toaster closeButton />
        </Provider>
      </body>
    </html>
  );
}
