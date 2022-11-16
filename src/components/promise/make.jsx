import React, { useState } from "react";
import { PopUpLayout } from "../PopUpLayout";
import * as S from "./promise.style";
import { MdCancel } from "react-icons/md";
import { makePromise } from "../../utils/promise";
import { channelId } from "../../data/chat";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";

export const MakePromise = ({ handlePopUp, promise, promisePopUp }) => {
  const user_id = useRecoilValue(userInfo)["user_id"];
  const ch_id = useRecoilValue(channelId);
  const [place, setPlace] = useState();
  const [meetDateTime, setMeetDateTime] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleMakePromise = () => {
    makePromise(
      promise.loaner_id,
      promise.owner_id,
      startDate,
      endDate,
      place,
      meetDateTime,
      promise.stage + 1,
      ch_id,
      user_id
    );
    handlePopUp();
    promisePopUp();
  };

  return (
    <PopUpLayout>
      <S.Head>
        <S.Title>상대방과 약속 잡기</S.Title>
        <MdCancel color="gray" onClick={handlePopUp} />
      </S.Head>
      <S.DataBox>
        <S.Input type="text" onChange={(e) => setPlace(e.target.value)} />
        <S.SubDesc>에서</S.SubDesc>
      </S.DataBox>
      <S.DataBox>
        <S.Input
          type="datetime-local"
          onChange={(e) => {
            setMeetDateTime(new Date(e.target.value));
          }}
        />
        <S.SubDesc>에 만나서</S.SubDesc>
      </S.DataBox>
      <S.DataBox>
        <S.Input
          type="date"
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <S.SubDesc>부터</S.SubDesc>
        <S.Input
          type="date"
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
        <S.SubDesc>까지 빌릴게요.</S.SubDesc>
      </S.DataBox>
      <S.PromiseBtn onClick={handleMakePromise}>약속 제안하기</S.PromiseBtn>
    </PopUpLayout>
  );
};
