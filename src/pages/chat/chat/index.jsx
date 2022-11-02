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
import { CustomAxios } from "../../../utils/CustomAxios";
import { isImageFile } from "../../../utils/isImage";
import * as S from "./chat.style";

export const Chat = ({ ch_id }) => {
  const user = useRecoilValue(userInfo);
  const user_id = user["user_id"];
  const input = useRef(null);
  const endRef = useRef(null);
  const imgRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [sendText, setSendText] = useState("");

  const getChatDatas = () => {
    const q = query(
      collection(db, "channels", ch_id, "chat"),
      orderBy("sendAt")
    );

    onSnapshot(q, (querySnapshot) => {
      setMessages([]);
      querySnapshot.forEach((doc) => {
        setMessages((prev) => [...prev, doc.data()]);
      });
    });
  };

  const sendChat = async () => {
    if (sendText.trim() !== "") {
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
      setSendText("");
    }
  };

  const sendImg = async (imgAdd) => {
    const newChatRef = doc(collection(db, "channels", ch_id, "chat"));
    const channelRef = doc(db, "channels", newChatRef._path["segments"][1]);
    const sendTime = new Date();
    await setDoc(newChatRef, {
      type: "image",
      content: imgAdd,
      from_id: user_id,
      sendAt: sendTime,
      id: newChatRef.id,
    });

    await updateDoc(channelRef, {
      sendAt: sendTime,
      lastText: "이미지를 전송했습니다.",
    });
    setSendText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  const handleUploadImg = async (e) => {
    const imgList = new FormData();
    if (isImageFile(e.target.files)) {
      imgList.append("multipartFile", e.target.files[0]);
      const response = await CustomAxios({
        method: "post",
        url: "/chat/files",
        data: imgList,
        headers: { "Content-Type": "multipart/form-data" },
      });
      sendImg(response.data[0]);
    } else {
      alert("png, jpg 파일만 업로드 가능합니다.");
      e.target.value = "";
    }
  };

  useMemo(() => getChatDatas(), [ch_id]);

  useEffect(() => endRef.current.scrollIntoView(), [messages]);

  return (
    <S.Frame>
      <S.ChatBox>
        {messages
          ? messages.map((data) =>
              data.from_id !== user_id ? (
                <S.ContentBox who={"opponent"} key={data.id}>
                  {data.type ? (
                    <S.ImgContent src={data.content}></S.ImgContent>
                  ) : (
                    <S.Content who={"opponent"}>{data.content}</S.Content>
                  )}
                </S.ContentBox>
              ) : (
                <S.ContentBox key={data.id}>
                  {data.type ? (
                    <S.ImgContent src={data.content}></S.ImgContent>
                  ) : (
                    <S.Content>{data.content}</S.Content>
                  )}
                </S.ContentBox>
              )
            )
          : null}
        <div ref={endRef} />
      </S.ChatBox>
      <S.InputBox>
        <S.ChatImgUpload for="input-file">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 14C19.5933 14 20.1734 13.8241 20.6667 13.4944C21.1601 13.1648 21.5446 12.6962 21.7716 12.1481C21.9987 11.5999 22.0581 10.9967 21.9424 10.4147C21.8266 9.83279 21.5409 9.29824 21.1213 8.87868C20.7018 8.45912 20.1672 8.1734 19.5853 8.05765C19.0033 7.94189 18.4001 8.0013 17.8519 8.22836C17.3038 8.45543 16.8352 8.83994 16.5056 9.33329C16.1759 9.82664 16 10.4067 16 11C16 11.7957 16.3161 12.5587 16.8787 13.1213C17.4413 13.6839 18.2044 14 19 14V14ZM19 10C19.1978 10 19.3911 10.0587 19.5556 10.1685C19.72 10.2784 19.8482 10.4346 19.9239 10.6173C19.9996 10.8 20.0194 11.0011 19.9808 11.1951C19.9422 11.3891 19.847 11.5673 19.7071 11.7071C19.5673 11.847 19.3891 11.9422 19.1951 11.9808C19.0011 12.0194 18.8 11.9996 18.6173 11.9239C18.4346 11.8482 18.2784 11.72 18.1685 11.5556C18.0586 11.3911 18 11.1978 18 11C18 10.7348 18.1054 10.4804 18.2929 10.2929C18.4804 10.1054 18.7348 10 19 10Z"
              fill="black"
            />
            <path
              d="M26 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V6C28 5.46957 27.7893 4.96086 27.4142 4.58579C27.0391 4.21071 26.5304 4 26 4V4ZM26 26H6V20L11 15L16.59 20.59C16.9647 20.9625 17.4716 21.1716 18 21.1716C18.5284 21.1716 19.0353 20.9625 19.41 20.59L21 19L26 24V26ZM26 21.17L22.41 17.58C22.0353 17.2075 21.5284 16.9984 21 16.9984C20.4716 16.9984 19.9647 17.2075 19.59 17.58L18 19.17L12.41 13.58C12.0353 13.2075 11.5284 12.9984 11 12.9984C10.4716 12.9984 9.96473 13.2075 9.59 13.58L6 17.17V6H26V21.17Z"
              fill="black"
            />
          </svg>
        </S.ChatImgUpload>
        <input
          onChange={handleUploadImg}
          ref={imgRef}
          type="file"
          id="input-file"
          style={{ display: "none" }}
        />
        <S.ChatInput
          ref={input}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="채팅 입력"
          onChange={(e) => setSendText(e.target.value)}
        />
        <S.SendBtn onClick={sendChat}>전송</S.SendBtn>
      </S.InputBox>
    </S.Frame>
  );
};
