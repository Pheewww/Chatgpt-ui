"use client";

import React, { useState } from 'react';

// Define a type for the chat object
interface Chat {
  id: number;
  name: string;
}

function Sidebar() {
  // Initialize the chats state with the correct type
  const [chats, setChats] = useState<Chat[]>([]);

  // Function to create a new chat
  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now(), // simple id generation based on timestamp
      name: `Chat ${chats.length + 1}`
    };
    setChats([...chats, newChat]);
  };

  // Function to delete a chat
  const deleteChat = (id: number) => {
    setChats(chats.filter(chat => chat.id !== id));
  };

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 h-screen">
      <button
        onClick={createNewChat}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create New Chat
      </button>
      <div>
        {chats.map((chat) => (
          <div key={chat.id} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
            <span>{chat.name}</span>
            <button
              onClick={() => deleteChat(chat.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
