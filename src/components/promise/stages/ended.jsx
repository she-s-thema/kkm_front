import React from "react";
import moment from "moment/moment";
import * as S from "../promise.style";

export const EndedStage = ({ promise, updatePromise, handlePopUp }) => {
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
      <S.PromiseBtn
        width={"100%"}
        onClick={() => {
          updatePromise();
          handlePopUp();
        }}
      >
        완료하기
      </S.PromiseBtn>
    </>
  );
};
