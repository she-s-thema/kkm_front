import React from "react";
import * as S from "./profile.style";

export const Profile = ({ info }) => {
  return (
    <S.Profile>
      <S.KakaoImg src={info["k_img_url"]} />
      <S.Info>
        <S.NickName>{info["nickname"]}</S.NickName>
        <p>{info["address"]}</p>
        <S.EditBtn>정보 수정</S.EditBtn>
      </S.Info>
    </S.Profile>
  );
};
