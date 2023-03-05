"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React from "react";
// Here, in Next 13 take care of the importing path: it is next/navigation not 'next/router' as in Next 12.
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function NewChat() {
  const { data: session } = useSession();
  const router = useRouter();
  const createNewChat = async () => {
    // the first argument of the addDoc function is a collection whereas the second argument
    // is the data itself
    const doc = await addDoc(
      collection(db, "chatGptUsers", session?.user?.email!, "chats"),
      {
        messages: [],
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    // Now go the the new chat screen with the just created document id which is a dynamic page
    router.push(`/chat/${doc.id}`);
  };
  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
