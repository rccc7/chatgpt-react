import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

// Define the type of the id parameter
type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  // Get the path name of the current dynamic page
  const pathName = usePathname();

  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  //   In this case we pass a query to the useCollection function
  //   In the query we first get he chats then filter by the id (which comes from Props),
  //   and finally get the messages
  const [messages] = useCollection(
    query(
      collection(
        db,
        "chatGptUsers",
        session?.user?.email!,
        "chats",
        id,
        "messages"
      )
    )
  );

  useEffect(() => {
    if (!pathName) return;

    setActive(pathName.includes(id));
  }, [pathName]);

  const removeChat = async () => {
    // Delete the document defined by the id
    // Here, we access the doc by id by first accessing the chatGptUsers, then the userName
    // then its chats and finally look in the chats set the specified id
    await deleteDoc(
      doc(db, "chatGptUsers", session?.user?.email!, "chats", id)
    );
    // After deleting the current chat whose id is associated with the current pat,
    // we need to replace the current URL path
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {/* Get the last message from that chat and display it or if it is a new chat just say 'New Chat' */}
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        className="h-5 w-5 text-gray-700 hover:text-red-700"
        onClick={removeChat}
      />
    </Link>
  );
}

export default ChatRow;
