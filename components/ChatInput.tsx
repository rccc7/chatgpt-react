"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // This was for testing before using useSWR hook
  // const model = "text-davinci-003";
  // TODO: useSWR to get the model for the chatGpt
  // Here, we are accessing the model through useSWR like in ModelSelection.
  // Don't forget to use the same key ("model") we used there. This way, the selected model here
  // will be the same seleted model in ModelSelection.tsx which is inside Sidebar.tsx
  // and is visible only when screen size reaches medium size.
  // Here We don't need to modify the model either, so we don't use setModel.
  // More details at ModelSelection.tsx.
  // Each model will determine the accuracy of the answers by ChatGPT. The most accurate so far
  // (according to my tests) is text-davinci-003 which is the default engine we are using.
  // It seems that text-davinci-003 is the best trained model by the moment.
  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    // Here, we are gonna create a Message object based on the interface defined in the typings.d.ts file
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          // If the user does not have an image the get an automatically generated avatar from ui-avatars api
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "chatGptUsers",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //Toast notification to say Loading...
    // The notification will be shown in the Toaster component defined in the
    // ClientProvider component which in turn is called from the top level component layout.tsx
    const notification = toast.loading("ChatGPT is thinking...");

    // Make a request to the API
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
      //   then occurs always after a successful execution of the await
    }).then(() => {
      // Toast notification to say successful
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });
  };
  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm outline-none">
      <form onSubmit={sendMessage} className="flex p-5 space-x-5 ">
        {/* here we can use either ref or state. In this case we'll use state  */}
        <input
          className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed
           disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          type="text"
          placeholder="Type your Message..."
        />
        <button
          type="submit"
          // Disabled if there is no prompt or no session
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded
          disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:opacity-100"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      {/* <div className="md:hidden">
        <ModelSelection />
      </div> */}
      <div className="md:hidden flex flex-row align-middle gap-2 items-center border-t pb-2">
        <p>Select model</p>
        <div className="flex-1 ">
          <ModelSelection />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
