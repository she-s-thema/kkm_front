import React from "react";
import * as S from "./card.style";

export const Card = ({ kkm, deals }) => {
  return (
    <S.Card>
      <S.Content column={true}>
        <S.SubTitle>보유 꼬막</S.SubTitle>
        <S.KkmBox>
          <span>{kkm}</span>
          <S.KkmLogo src="../../../assets/images/logo.png" />
        </S.KkmBox>
      </S.Content>
      <S.Content column={false}>
        <div>
          <S.SubTitle>거래 내역</S.SubTitle>
          <span>{deals ? deals.length : "0"}건</span>
        </div>
        <img
          style={{ width: "5%", objectFit: "contain" }}
          src="../../../assets/icons/backward.png"
        />
      </S.Content>
    </S.Card>
  );
};
