// ChatWindow.tsx
import React, { useState, useEffect } from "react";

interface ChatWindowProps {
  receiverId: string;
  currentUserId: string;
  token: string;
  sendChatMessage: (message: string) => void;
  messages: string[]; // Store the chat messages
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  receiverId,
  currentUserId,
  token,
  sendChatMessage,
  messages
}) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      await sendChatMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl">
      <div className="flex flex-col space-y-4">
        <div className="flex-1 overflow-y-auto max-h-96">
          {/* Display chat messages */}
          {messages.map((msg, index) => (
            <div key={index} className="p-2 border-b">
              <span className="font-medium text-gray-900">{msg}</span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
