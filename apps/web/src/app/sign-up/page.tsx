import Link from "next/link";

import { OauthButton } from "@/components/forms/oauth-buttons";
import SignUpForm from "@/components/forms/sign-up-form";

export const runtime = "edge";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex h-dvh items-center justify-center">
      <div className="bg-muted border-subtle w-fit rounded-lg border p-16">
        <h1 className="font-cal text-emphasis text-2xl">
          Create your BuildIt
          <br /> account
        </h1>
        <p className="text-subtle">
          Free for individuals. Team plan for <br /> collaborative features.
        </p>
        <SignUpForm />
        <div className="my-4 flex w-full items-center">
          <div className="bg-emphasis h-[1px] w-full" />
          <p className="text-subtle px-2 text-sm">OR</p>
          <div className="bg-emphasis h-[1px] w-full" />
        </div>
        <OauthButton />
        <p className="text-subtle mt-4 text-xs">
          Already have an account?{" "}
          <Link href={"/auth/signin"} className="text-default font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
