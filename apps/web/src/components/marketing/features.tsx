import Image from "next/image";

export default function FeaturesSection(): JSX.Element {
  return (
    <section className="grid grid-cols-2">
      <div className="relative col-span-3 mb-4 overflow-hidden rounded-md border bg-weak px-7 py-9 lg:h-[391px]">
        <h1 className="font-cal text-2xl text-strong">Create issue</h1>
        <p className="text-sub ">
          Easily create and manage issues with BuildIt&apos;s intuitive
          interface. Track tasks, assign <br className="hidden lg:block" />{" "}
          roles, and set priorities to keep your projects on track.
        </p>
        <Image
          src={"/Create-Issue-Modal.svg"}
          alt="Create Issue"
          width={820}
          height={500}
          className="-bottom-1 absolute right-0 hidden max-h-full max-w-full lg:block"
        />
      </div>
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="relative col-span-2 overflow-hidden rounded-md border bg-weak px-7 py-9 lg:col-span-1">
          <h1 className="font-cal text-2xl text-strong">
            View and Manage issue
          </h1>
          <p className="text-sub ">
            Keep track of all your tasks with a comprehensive list of issues.
            Easily view, update, and prioritize issues to ensure your team stays
            on top of project progress.
          </p>
        </div>
        <div className="relative col-span-2 overflow-hidden rounded-md border bg-weak px-7 py-9 lg:col-span-1">
          <h1 className="font-cal text-2xl text-strong">
            Organize with Grouping
          </h1>
          <p className="text-sub ">
            Efficiently manage your workflow by grouping issues by status,
            priority, or assignee. Keep your team focused and projects on track
            with a clear and organized view of tasks.
          </p>
        </div>
      </div>
    </section>
  );
}
