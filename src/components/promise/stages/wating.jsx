import moment from "moment/moment";
import React from "react";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../../data/user";
import * as S from "../promise.style";

export const WaitingStage = ({ promise, updatePromise, handlePopUp }) => {
  const user_id = useRecoilValue(userInfo)["user_id"];

  return (
    <>
      <S.Title>상대방과 약속이 있어요!</S.Title>
      <S.DataBox>
        <S.PromiseData>{promise.place}</S.PromiseData>
        <S.SubDesc>에서</S.SubDesc>
      </S.DataBox>
      <S.DataBox>
        <S.PromiseData>
          {moment(promise.time.toDate().toString()).format(
            "MM월 DD일 hh시 mm분"
          )}
        </S.PromiseData>
        <S.SubDesc>에 만나서 {!promise.period && "반납할게요."}</S.SubDesc>
      </S.DataBox>
      {promise.period && (
        <S.DataBox>
          <S.PromiseData>
            {moment(promise.period["start_date"].toDate().toString()).format(
              "MM월 DD일"
            )}
          </S.PromiseData>
          <S.SubDesc>부터 </S.SubDesc>
          <S.PromiseData>
            {moment(promise.period["end_date"].toDate().toString()).format(
              "MM월 DD일"
            )}
          </S.PromiseData>
          <S.SubDesc>까지 빌릴게요</S.SubDesc>
        </S.DataBox>
      )}
      {promise.from_id === user_id ? (
        <S.PromiseBtn width={"100%"}>수락을 기다리고 있어요 ∙∙∙</S.PromiseBtn>
      ) : (
        <S.DataBox>
          <S.PromiseBtn
            width={"48%"}
            onClick={() => {
              updatePromise();
              handlePopUp();
            }}
          >
            수락
          </S.PromiseBtn>
          <S.PromiseBtn
            width={"48%"}
            onClick={() => {
              handlePopUp();
            }}
          >
            거절
          </S.PromiseBtn>
        </S.DataBox>
      )}
    </>
  );
};
