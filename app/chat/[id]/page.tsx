import React from "react";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
// NOTICE: When accessing this dynamic page we are keeping the original layout
// components (defined in../layout.tsx)
//IMPORTANT: Since this is a page route it automaticalle receives params such as the id
// which is in the dynamic URL route: ie.: In this url http://localhost:3000/chat/Z780iWHZaJr34jPKJ14r
// the param id is "Z780iWHZaJr34jPKJ14r"
type Props = {
  params: {
    id: string;
  };
};
function ChatPage({ params: { id } }: Props) {
  //   console.log("The dynamic page props:>>", props);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
