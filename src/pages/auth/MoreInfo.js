import axios from "axios";
import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { kakaoUserInfo } from "../../data/atom";

export const MoreInfo = () => {
  const newUser = new FormData();
  const { kakao } = window;
  const user = useRecoilValue(kakaoUserInfo);
  const [isClicked, setIsClicked] = useState(false);
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");

  const completeHandler = (data) => {
    // 위치 선택이 끝난 후
    setAddress(data["address"]);
    setIsClicked(false);
  };

  const signUp = async () => {
    for (let key of newUser.keys()) {
      console.log(key);
    }
    for (let value of newUser.values()) {
      console.log(value);
    }
    await axios
      .post(`/user/join`, newUser)
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    if (address !== "") {
      newUser.append("user_id", "0");
      newUser.append("k_id", user["k_id"]);
      newUser.append("k_img_url", user["k_img_url"].replace(/['"]/g, ""));
      newUser.append("nickname", nickname);
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          // 위도 : result[0].y, 경도 : result[0].x
          newUser.append("lat", result[0].y);
          newUser.append("lon", result[0].x);
          newUser.append("address", address);
        }
      });
    }
  }, [address]);

  return (
    <div>
      <ProfileImg src={user["k_img_url"].replace(/['"]/g, "")} />
      <span>닉네임 설정</span>
      <input
        type="text"
        placeholder="닉네임 설정 2 ~ 10자"
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setIsClicked((prev) => !prev);
        }}
      >
        위치 설정
      </button>
      {isClicked && (
        <DaumPostcodeEmbed onComplete={completeHandler} autoClose={false} />
      )}
      <button type="button" onClick={signUp}>
        회원가입
      </button>
    </div>
  );
};

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  object-fit: cover;
`;
