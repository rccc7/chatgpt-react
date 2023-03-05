"use client";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
  // Down here, we are destructuring the useSession and renaming the data variable to session
  const { data: session } = useSession();
  //   console.log("The image>>>", session?.user?.image);

  // Here in the paramters we firts verify whether the session exists because we need
  // the user in order to get the chats (session && query(collection(....))
  // As a second parameter to the query we send the orderBy statement to order the messages
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "chatGptUsers", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  console.log("the chats>>>", chats);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* NewChat */}
          <NewChat />
          <div className="hidden md:inline">
            {/* ModelSelection */}
            <ModelSelection />
          </div>
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats....</p>
              </div>
            )}
            {/* Map through the ChartRows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <img
          src={session.user?.image!}
          alt="Profile Picture"
          title="Sign Out"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-auto hover:opacity-50"
          onClick={() => signOut()}
        />
      )}
    </div>
  );
}

export default SideBar;
