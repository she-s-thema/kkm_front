import moment from "moment";
import React from "react";
import { useState } from "react";
import { CompletePromise } from "./complete";
import { MakePromise } from "./make";
import * as S from "./promise.style";

export const PromisePopUp = ({ promise, completePromise }) => {
  const [isClicked, setIsClicked] = useState(0);
  return (
    <>
      {isClicked === 1 ? (
        <MakePromise handlePopUp={(prev) => setIsClicked(0)} />
      ) : isClicked === 2 ? (
        <CompletePromise handlePopUp={(prev) => setIsClicked(0)} />
      ) : null}
      <S.PopUpLayout>
        {promise.stage === 1 ? (
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
              <S.SubDesc>에 만나서</S.SubDesc>
            </S.DataBox>
            <S.DataBox>
              <S.PromiseData>
                {moment(
                  promise.period["start_date"].toDate().toString()
                ).format("MM월 DD일")}
              </S.PromiseData>
              <S.SubDesc>부터 </S.SubDesc>
              <S.PromiseData>
                {moment(promise.period["end_date"].toDate().toString()).format(
                  "MM월 DD일"
                )}
              </S.PromiseData>
              <S.SubDesc>까지 빌릴게요</S.SubDesc>
            </S.DataBox>
            <S.PromiseBtn onClick={() => setIsClicked(2)} width={"100%"}>
              완료하기
            </S.PromiseBtn>
          </>
        ) : (
          <>
            <p
              style={{ fontWeight: 600, color: "#4e6eff", fontSize: "smaller" }}
            >
              상대방과 약속이 없어요!
            </p>
            <S.PromiseBtn width={"100%"} onClick={() => setIsClicked(1)}>
              약속 제안하기
            </S.PromiseBtn>
          </>
        )}
      </S.PopUpLayout>
    </>
  );
};
