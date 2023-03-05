// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/queryApi";
import admin from "firebase-admin";
import { adminDb } from "../../firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Pleas provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Pleas provide a valid chatId!" });
    return;
  }

  //   ChatGPT Query:
  const response = await query(prompt, chatId, model);
  const message: Message = {
    text: response || "ChatGpt could not find an answer for that!",
    // We need to get the admin from firestore from backend
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    },
  };

  // Add the chatGPt answer into the database before sending response
  await adminDb
    .collection("chatGptUsers")
    .doc(session?.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
