import { useEffect, useRef, useState } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import Message from "./Message";

type ChatProps = {
  chatId: string;
};

function Chat({ chatId }: ChatProps) {
  const [messages, setMessages] = useState<Array<{ id: number; text: string; user: { name: string; avatar: string; }; }>>([]);

  // Simulate message fetching on mount and cache the messages
  useEffect(() => {
    // Replace this with your actual API call to fetch messages
    const fetchMessages = async () => {
      const response = await fetch(`/api/messages?chatId=${chatId}`);
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, [chatId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 && (
        <>
          <p className="mt-10 text-center text-white">
            Type a message below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Chat;
