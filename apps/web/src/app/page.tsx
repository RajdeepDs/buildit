import Link from "next/link";

import { Button } from "@buildit/ui";

import { getSession } from "@/lib/data/get-session";

export const runtime = "edge";

export default async function Home() {
  const isSession = await getSession();

  return (
    <main className="">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Welcome to buildit!</h1>
        <p className="mt-4 text-center text-lg">
          An open source collaborative project management tool.
        </p>
        <Button asChild variant={"outline"} className="mt-10">
          {isSession ? (
            <Link href="/">Dashboard</Link>
          ) : (
            <Link href="/auth/signin">Sign in</Link>
          )}
        </Button>
      </div>
    </main>
  );
}
