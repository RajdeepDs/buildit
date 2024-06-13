import InboxHeader from "./inbox-header";
import InboxListItems from "./list-items";

export default function InboxList() {
  return (
    <div className="border-muted flex h-full w-1/4 flex-col border-r">
      <InboxHeader />
      <div className="flex-1 overflow-y-auto">
        <InboxListItems />
      </div>
    </div>
  );
}
