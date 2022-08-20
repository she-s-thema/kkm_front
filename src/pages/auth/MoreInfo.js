import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useRecoilState } from "recoil";
import { userInfo } from "../../data/atom";
import { Address } from "./Address";

export const MoreInfo = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [address, setAddress] = useState("");
  const [nickname, setNickname] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const saveInfo = async () => {
    setUser((prev) => {
      let newInfo = { ...prev };
      newInfo["nickname"] = nickname;
      newInfo["address"] = address;
      return newInfo;
    });
  };

  const signUp = async () => {
    const newUser = new FormData();
    newUser.append("user_id", "0");
    newUser.append("nickname", user["nickname"]);
    newUser.append("k_id", user["k_id"]);
    newUser.append("k_img_url", user["k_img_url"]);
    newUser.append("lat", user["lat"]);
    newUser.append("lon", user["lon"]);
    newUser.append("address", user["address"]);

    await axios
      .post(`/user/join`, newUser)
      .then((res) => console.log(res.data));
  };

  const completeHandler = (data) => {
    setAddress(() => data["address"]);
    setIsClicked(false);
  };

  const setViewHandler = () => {
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    if (user["nickname"] !== "" && user["address"] !== "") {
      signUp();
    }
  }, [user]);

  return (
    <div>
      <div>
        <span>닉네임 설정</span>
      </div>
      <div>
        <input
          type="text"
          placeholder="닉네임 설정 2 ~ 10자"
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div>
        <button onClick={setViewHandler}>위치 설정</button>
      </div>
      <div>
        {isClicked ? (
          <DaumPostcodeEmbed onComplete={completeHandler} autoClose={false} />
        ) : (
          <Address add={address} />
        )}
      </div>
      <div>
        <button type="button" onClick={saveInfo}>
          회원가입
        </button>
      </div>
    </div>
  );
};
