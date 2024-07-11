import type { Metadata } from "next";

import { Separator } from "@buildit/ui";

import { OauthButton } from "@/components/sign-in/oauth-buttons";
import SignInForm from "@/components/sign-in/sign-in-form";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your BuildIt account",
};

export default function LoginPage(): JSX.Element {
  return (
    <div className="h-fit max-w-72 space-y-6">
      <div className="flex flex-col items-start space-y-1">
        <p className="font-semibold text-lg text-strong">Plan it. Build it.</p>
        <h1 className="font-cal text-soft/75 text-xl tracking-wide">
          Log in to your BuildIt account
        </h1>
      </div>
      <OauthButton />
      <Separator />
      <SignInForm />
    </div>
  );
}
