import type { Metadata } from "next";

import OnboardingPageClient from "./page-client";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Get started with BuildIt.",
};

export default async function OnboardingPage(): Promise<JSX.Element> {
  return <OnboardingPageClient />;
}
