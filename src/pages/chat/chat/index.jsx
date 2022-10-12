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
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import db from "../../../config/firebaseConfig";
import { userInfo } from "../../../data/user";
import * as S from "./chat.style";

export const Chat = ({ ch_id }) => {
  const user = useRecoilValue(userInfo);
  const user_id = user["user_id"];
  const input = useRef(null);
  const endRef = useRef(null);
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

  useEffect(() => {
    endRef.current.scrollIntoView();
  }, [messages]);

  return (
    <S.Frame>
      <S.ChatBox>
        {messages &&
          messages.map((data) =>
            data.from_id !== user_id ? (
              <S.ContentBox who={"opponent"} key={data.id}>
                <S.Content who={"opponent"}>{data.content}</S.Content>
              </S.ContentBox>
            ) : (
              <S.ContentBox key={data.id}>
                <S.Content>{data.content}</S.Content>
              </S.ContentBox>
            )
          )}
        <div ref={endRef} />
      </S.ChatBox>
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
    </S.Frame>
  );
};
