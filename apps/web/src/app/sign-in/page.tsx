import type { Metadata } from "next";

import { OauthButton } from "@/components/sign-in/oauth-buttons";
import SignInForm from "@/components/sign-in/sign-in-form";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your BuildIt account",
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex h-dvh items-center justify-center">
      <div className="bg-muted border-subtle w-fit rounded-lg border p-16">
        <h1 className="font-cal text-emphasis text-2xl">
          Signin to your BuildIt
          <br /> account
        </h1>
        <p className="text-subtle text-sm">
          Free for individuals. Team plan for <br /> collaborative features.
        </p>
        <SignInForm />
        <div className="my-4 flex w-full items-center">
          <div className="bg-emphasis h-[1px] w-full" />
          <p className="text-subtle px-2 text-sm">OR</p>
          <div className="bg-emphasis h-[1px] w-full" />
        </div>
        <OauthButton />
      </div>
    </div>
  );
}
