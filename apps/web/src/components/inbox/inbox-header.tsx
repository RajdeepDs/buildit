import { Icons } from "@buildit/ui/icons";

export default function InboxHeader() {
  return (
    <div className="border-muted flex w-full items-center justify-between border-b bg-white p-2">
      <h1 className="font-cal text-default mt-1">Inbox</h1>
      <button className="hover:bg-subtle rounded-md p-2 transition-colors duration-300 ease-in-out">
        <Icons.filter className="text-default h-4 w-4 cursor-pointer" />
      </button>
    </div>
  );
}
