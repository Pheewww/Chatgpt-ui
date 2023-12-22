type MessageProps = {
  message: {
    text: string;
    user: {
      name: string;
      avatar: string;
    };
  };
};

function Message({ message }: MessageProps) {
  const isAiChatbot = message.user.name === "AIChatbot";

  return (
    <div className={`py-5 text-white w-full ${isAiChatbot ? "bg-[#434654]" : ""}`}>
      <div className="flex space-x-5 px-10 max-w-5xl">
        <img
          src={isAiChatbot ? "https://ui-avatars.com/api/?name=AI+Chatbot" : message.user.avatar}
          alt="User Avatar"
          className="h-8 w-8 rounded-full"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
