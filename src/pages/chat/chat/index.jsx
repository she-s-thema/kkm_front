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
import { FaImages, FaRegCalendarAlt } from "react-icons/fa";
import { PromisePopUp } from "../../../components/promise";
import { getPromises } from "../../../utils/promise";
import { sendChat } from "../../../utils/chat";

export const Chat = ({ ch_id }) => {
  const user_id = useRecoilValue(userInfo)["user_id"];
  const input = useRef(null);
  const endRef = useRef(null);
  const imgRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [sendText, setSendText] = useState("");
  const [promise, setPromise] = useState();
  const [promiseClick, setPromiseClick] = useState(false);

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

  const sendChatHandle = async () => {
    if (sendText.trim() !== "") {
      input.current.value = "";
      sendChat(ch_id, user_id, sendText);
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
  useMemo(() => {
    setPromiseClick(false);
    setPromise(null);
    getChatDatas();
  }, [ch_id]);

  useEffect(() => {
    getPromises(ch_id).then((data) => {
      setPromise(data);
    });
    setPromiseClick(false);
    endRef.current.scrollIntoView();
  }, [messages]);

  return (
    <S.Frame>
      <S.ChatBox>
        {promiseClick && (
          <PromisePopUp
            promise={promise}
            handlePopUp={() => setPromiseClick((prev) => !prev)}
          />
        )}
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
        <S.ChatImgUpload htmlFor="input-file">
          <FaImages size="90%" />
        </S.ChatImgUpload>
        <input
          onChange={handleUploadImg}
          ref={imgRef}
          type="file"
          id="input-file"
          style={{ display: "none" }}
        />
        <S.PromiseBox onClick={() => setPromiseClick((prev) => !prev)}>
          <FaRegCalendarAlt size="70%" />
        </S.PromiseBox>
        <S.ChatInput
          ref={input}
          onKeyPress={(e) => (e.key === "Enter" ? sendChatHandle() : null)}
          type="text"
          placeholder="채팅 입력"
          onChange={(e) => setSendText(e.target.value)}
        />
        <S.SendBtn onClick={sendChatHandle}>전송</S.SendBtn>
      </S.InputBox>
    </S.Frame>
  );
};
