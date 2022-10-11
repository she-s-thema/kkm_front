import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { BackButton } from "../../../components/BackButton";
import db from "../../../config/firebaseConfig";
import { userInfo } from "../../../data/user";
import * as S from "./chat.style";

export const Chat = ({ ch_id }) => {
  const user = useRecoilValue(userInfo);
  const user_id = user["user_id"];
  const input = useRef(null);
  const [messages, setMessages] = useState([]);
  const [sendText, setSendText] = useState("");

  const getChatDatas = () => {
    const q = query(
      collection(db, "channels", ch_id, "chat"),
      orderBy("sendAt")
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      setMessages([]);
      querySnapshot.forEach((doc) => {
        setMessages((prev) => [...prev, doc.data()]);
      });
    });
  };

  const sendChat = async () => {
    const newChatRef = doc(collection(db, "channels", ch_id, "chat"));
    const channelRef = doc(db, "channels", newChatRef._path["segments"][1]);
    const sendTime = new Date();
    input.current.value = "";

    await setDoc(newChatRef, {
      content: sendText,
      from_id: user_id,
      sendAt: sendTime,
      id: newChatRef.id,
    });

    await updateDoc(channelRef, {
      sendAt: sendTime,
      lastText: sendText,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  useMemo(() => getChatDatas(), [ch_id]);

  return (
    <S.ChatBox>
      {messages &&
        messages.map((data) =>
          data.from_id !== user_id ? (
            <div key={data.id}>
              <S.Opponent>{data.from_id}</S.Opponent>
              <S.Opponent>{data.content}</S.Opponent>
              <S.Opponent>{data.sendAt.toDate().toString()}</S.Opponent>
            </div>
          ) : (
            <div key={data.id}>
              <span>{data.content}</span>
              <span>{data.sendAt.toDate().toString()}</span>
            </div>
          )
        )}
      <div>
        <input
          ref={input}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="채팅 입력"
          onChange={(e) => setSendText(e.target.value)}
        />
        <button onClick={sendChat}>전송</button>
      </div>
    </S.ChatBox>
  );
};
