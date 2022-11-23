import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import db from "../../../config/firebaseConfig";
import * as S from "./channels.style";
import { userInfo } from "../../../data/user";
import moment from "moment";
import { channelId } from "../../../data/chat";
import { timeDifference } from "../../../utils/timeDifference";

export const Channels = (props) => {
  const [channels, setChannels] = useState([]);
  const [loanerChat, setLoanerChat] = useState([]);
  const [ownerChat, setOwnerChat] = useState([]);
  const user = useRecoilValue(userInfo);
  const [sChannelId, setSChannelId] = useRecoilState(channelId);
  const user_id = user["user_id"];

  const getChats = () => {
    const q1 = query(
      collection(db, "channels"),
      where("loaner_id", "==", user_id)
    );

    const unsub1 = onSnapshot(q1, (querySnapshot) => {
      setLoanerChat([]);
      querySnapshot.forEach((doc) => {
        setLoanerChat((prev) => [...prev, doc.data()]);
      });
    });

    const q2 = query(
      collection(db, "channels"),
      where("owner_id", "==", user_id)
    );

    const unsub2 = onSnapshot(q2, (querySnapshot) => {
      setOwnerChat([]);
      querySnapshot.forEach((doc) => {
        setOwnerChat((prev) => [...prev, doc.data()]);
      });
    });
  };

  useMemo(() => getChats(), []);

  useEffect(() => {
    const channels = [];
    loanerChat.forEach((doc) => channels.push(doc));
    ownerChat.forEach((doc) => channels.push(doc));

    channels.sort((a, b) => {
      return a.sendAt > b.sendAt ? -1 : a.sendAt < b.sendAt ? 1 : 0;
    });

    channels.forEach((data) => {
      data.sendAt = timeDifference(data.sendAt.toDate());
    });

    setChannels(channels);
  }, [ownerChat, loanerChat]);

  return (
    <S.ChatBox>
      <S.ChatCards>
        {channels &&
          channels.map((data) => (
            <div key={data.id}>
              <S.ChatCard
                isClicked={sChannelId === data.id}
                onClick={() => props.changeChId(data.id)}
              >
                <S.ChatProfile
                  src={
                    data.loaner_id === user_id
                      ? data.owner_profile
                      : data.loaner_profile
                  }
                />
                <S.UserInfo>
                  <S.ChatName>
                    {data.loaner_id === user_id
                      ? data.owner_name
                      : data.loaner_name}
                  </S.ChatName>
                  <S.SubInfo>
                    <S.ChatContent>{data.lastText}</S.ChatContent>
                    <S.MidLine>·</S.MidLine>
                    <S.Time>{data.sendAt}</S.Time>
                  </S.SubInfo>
                </S.UserInfo>
              </S.ChatCard>
            </div>
          ))}
      </S.ChatCards>
    </S.ChatBox>
  );
};
