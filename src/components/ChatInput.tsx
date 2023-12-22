"use client";

import { useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR, { mutate } from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch and cache the messages for the current chat
  const { data: messages, mutate: mutateMessages } = useSWR(`/api/messages?chatId=${chatId}`);

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    const input = prompt.trim();
    setPrompt("");

    // Construct new message
    const newMessage = {
      text: input,
      createdAt: new Date().toISOString(),
      user: {
        _id: session?.user?.email ?? 'unknown',
        name: session?.user?.name ?? 'Anonymous',
        avatar: session?.user?.image ?? 'https://placekitten.com/g/200/200',
      },
    };

    // Optimistically update the messages cache with the new message
    mutateMessages([...(messages || []), newMessage], false);

    try {
      // Send the message to your API for processing
      const response = await fetch(`/api/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          message: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success("Message sent!");
      // Revalidate the messages cache
      mutate(`/api/messages?chatId=${chatId}`);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      // Rollback the optimistic update
      mutate(`/api/messages?chatId=${chatId}`);
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Resize the textarea based on content
  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Update prompt and resize textarea on input change
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    resizeTextarea();
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-[16px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="p-5 space-x-5 flex"
      >
        <textarea
          ref={textareaRef}
          placeholder="Type your message here ..."
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 resize-none"
          disabled={!session}
          value={prompt}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />

        <button
          title="Send Message"
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded cursor-pointer text-[16px] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-[#11A37F]"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
            