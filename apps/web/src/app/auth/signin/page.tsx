import Link from "next/link";

import { OauthButton } from "@/components/forms/oauth-buttons";
import SignInForm from "./form";

export const runtime = "edge";

export default function SignIn(): JSX.Element {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <h1 className="font-cal mb-4 text-2xl">Welcome Back</h1>
      <div className="border-subtle w-fit rounded-lg border bg-white p-16">
        <SignInForm />
        <div className="my-4 flex w-full items-center">
          <div className="bg-emphasis h-[1px] w-full" />
          <p className="text-subtle px-2 text-sm">OR</p>
          <div className="bg-emphasis h-[1px] w-full" />
        </div>
        <OauthButton />
      </div>
      <p className="text-subtle mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"/sign-up"} className="text-default font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
}
