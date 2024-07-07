import { Button } from "@buildit/ui";

export const runtime = "edge";

export default async function Home() {
  return (
    <main className="mt-10">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-5">
        <h1 className="text-5xl font-bold font-cal text-emphasis">
          Welcome to BuildIt!
        </h1>
        <p className="text-2xl font-cal text-subtle">
          The open-source project development tool.
        </p>
        <Button>Coming soon!</Button>
      </div>
    </main>
  );
}
