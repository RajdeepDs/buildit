import { Button } from "@buildit/ui";

import { getSession } from "@/lib/data/get-session";
import { getWorkspaceSlug } from "@/lib/data/workspace/get-workspace-slug";

export const runtime = "edge";

export default async function Home() {
  const isSession = await getSession();
  const workspaceSlug = await getWorkspaceSlug();

  return (
    <main className="">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Welcome to buildit!</h1>
        <p className="mt-4 text-center text-lg">
          An open source collaborative project management tool.
        </p>
        {isSession ? (
          <Button
            color="secondary"
            href={`/${workspaceSlug}/my-issues`}
            className="my-10"
          >
            <p>Dashboard</p>
          </Button>
        ) : (
          <Button color="primary" href="/sign-in" className="my-10">
            Sign In
          </Button>
        )}
      </div>
    </main>
  );
}
