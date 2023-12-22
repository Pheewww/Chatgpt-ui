// "use client";
// import Chat from "../../../components/Chat";
// import ChatInput from "../../../components/ChatInput";

// type Props = {
//   params: {
//     id: string;
//   };
// };

// function ChatPage({ params: { id } }: Props) {
//   return (
//     <div className="flex flex-col h-screen overflow-hidden p-5 pt-16 md:pt-5">
//       <Chat chatId={id} />

//       <ChatInput chatId={id} />
//     </div>
//   );
// }

// export default ChatPage;


// pages/chat/[id].tsx
import { useRouter } from 'next/navigation';
import Chat from '../../../components/Chat';
import ChatInput from '../../../components/ChatInput';

     

function ChatPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return <div>Loading...</div>; // or any other loading state
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden p-5 pt-16 md:pt-5">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
