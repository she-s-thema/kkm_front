import React from "react";
import { useRef } from "react";
import { MdCancel } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import { CustomAxios } from "../../utils/customAxios";
import { PopUpLayout } from "../PopUpLayout";
import * as S from "./promise.style";

export const GiveKkomak = ({
  updatePromise,
  promise,
  handlePopUp,
  promisePopUp,
}) => {
  const first = useRef(null);
  const second = useRef(null);
  const user_id = useRecoilValue(userInfo)["user_id"];

  const slideToNext = () => {
    first.current.style.animation = "slide-out 1s ease-out";
    second.current.style.animation = "slide-in 0.7s ease";
    setTimeout(() => {
      first.current.style.display = "none";
      second.current.style.display = "flex";
    }, 1000);
    setTimeout(() => {
      updatePromise();
      handlePopUp();
      promisePopUp();
    }, 4000);
  };

  const sendKkomak = async () => {
    const userId =
      promise.loaner_id === user_id ? promise.owner_id : promise.loaner_id;
    const response = await CustomAxios.put(`/getKKM/${userId}?value=2`);
    if (response.data === "success") {
      slideToNext();
    } else alert(response.statusText);
  };

  return (
    <PopUpLayout height={"20%"}>
      <div ref={first} style={{ textAlign: "center" }}>
        <S.Head>
          <S.Title></S.Title>
          <MdCancel color="gray" onClick={handlePopUp} />
        </S.Head>
        <S.Quest>거래가 만족스러우셨나요?</S.Quest>
        <S.SubDesc>만족하신다면 상대방에게 꼬막 2개를 주게 돼요!</S.SubDesc>
        <S.KkomakBox>
          <S.PromiseBtn onClick={sendKkomak} width={"48%"}>
            네! 좋았어요!
          </S.PromiseBtn>
          <S.PromiseBtn width={"48%"} backColor={"#808080"}>
            아니요 별로였어요...
          </S.PromiseBtn>
        </S.KkomakBox>
      </div>
      <div
        ref={second}
        style={{
          display: "none",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <S.Kkomak src="../../../assets/logos/click.png" />
        <S.Quest>상대방에게 꼬막 2개를 보냈어요!</S.Quest>
      </div>
    </PopUpLayout>
  );
};
