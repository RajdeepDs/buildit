import { getInboxMessages } from "@/configs/inbox-messages";

export default function InboxListItems() {
  // Dummy data for the inbox messages
  const messages = getInboxMessages;
  return (
    <div className="space-y-2 p-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-muted hover:bg-subtle flex cursor-pointer items-center justify-between space-x-2 rounded p-3 transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center space-x-2 overflow-hidden">
            <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gray-300"></div>
            <div className="flex flex-col items-start overflow-hidden">
              <div className="flex space-x-2 overflow-hidden">
                <h1 className="flex-shrink-0">{message.id}</h1>
                <h2 className="truncate">{message.title}</h2>
              </div>
              <p className="text-subtle text-sm">{message.message}</p>
            </div>
          </div>
          <span className="text-subtle flex-shrink-0 text-sm">
            {message.date}
          </span>
        </div>
      ))}
    </div>
  );
}
