import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../config/firebaseConfig";

export const sendChat = async (ch_id, user_id, text) => {
  const newChatRef = doc(collection(db, "channels", ch_id, "chat"));
  const channelRef = doc(db, "channels", newChatRef._path["segments"][1]);
  const sendTime = new Date();

  await setDoc(newChatRef, {
    content: text,
    from_id: user_id,
    sendAt: sendTime,
    id: newChatRef.id,
  });

  await updateDoc(channelRef, {
    sendAt: sendTime,
    lastText: text,
  });
};
