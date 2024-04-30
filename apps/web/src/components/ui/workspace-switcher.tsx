"use client";

type WorkspaceSwitcherProps = {
  workspaceName: string;
  workspaceSlug: string;
};

export default function WorkspaceSwitcher({
  workspaceName,
  workspaceSlug,
}: WorkspaceSwitcherProps): JSX.Element {
  return (
    // TODO: Create a proper workspace switcher component
    <div className="flex w-full items-center  gap-x-1 border px-2 py-3">
      <div className="h-8 w-8 rounded-full bg-gray-400"></div>
      <h1 className="">{workspaceName}</h1>
    </div>
  );
}
