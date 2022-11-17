import React from "react";
import * as S from "../promise.style";

export const Kkomak = ({ clickHandle }) => {
  return (
    <>
      <S.Title>거래가 끝났어요!</S.Title>
      <S.PromiseBtn onClick={clickHandle}>꼬막 주기</S.PromiseBtn>
    </>
  );
};
