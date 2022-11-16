import React from "react";
import * as S from "../promise.style";

export const CompletedStage = ({ clickHandle, stage }) => {
  return (
    <>
      <S.Title>
        {stage % 6 === 0
          ? "상대방과 약속이 없어요!"
          : "옷 반납을 위해 두 번째 약속을 잡아보세요!"}
      </S.Title>
      <S.PromiseBtn width={"100%"} onClick={clickHandle}>
        약속 제안하기
      </S.PromiseBtn>
    </>
  );
};
