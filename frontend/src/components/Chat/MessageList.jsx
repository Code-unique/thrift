// components/Chat/MessageList.jsx
const MessageList = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      {messages.map((message, index) => {
        // Ensure message exists and has the necessary properties
        const senderName = message?.sender?.name || 'Unknown Sender';
        const content = message?.content || 'No content available';

        return (
          <div
            key={index}
            className="p-2 rounded border bg-gray-100 dark:bg-gray-800"
          >
            <p className="font-bold text-gray-800 dark:text-gray-200">
              {senderName}
            </p>
            <p className="text-gray-600 dark:text-gray-400">{content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
