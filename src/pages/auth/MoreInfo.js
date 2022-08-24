import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useRecoilState } from "recoil";
import { userInfo } from "../../data/atom";
import { ShowAddress } from "./ShowAddress";

export const MoreInfo = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [moreInfo, setMoreInfo] = useState({
    nickname: "",
    address: "",
    lat: 0,
    lon: 0,
  });
  const [isClicked, setIsClicked] = useState(false);
  const { kakao } = window;

  const saveInfo = async () => {
    setUser((prev) => {
      let newInfo = { ...prev };
      newInfo["nickname"] = moreInfo["nickname"];
      newInfo["address"] = moreInfo["address"];
      newInfo["lat"] = moreInfo["lat"];
      newInfo["lon"] = moreInfo["lon"];
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
    setMoreInfo((prev) => {
      let curr = { ...prev };
      curr["address"] = data["address"];
      return curr;
    });
    setIsClicked(false);
  };

  const viewHandler = () => {
    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    if (moreInfo["address"] !== "") {
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(moreInfo["address"], function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setMoreInfo((prev) => {
            let neww = { ...prev };
            neww["lat"] = result[0].y;
            neww["lon"] = result[0].x;
          });
        }
      });
    }
    if (user["nickname"] !== "" && user["address"] !== "") {
      signUp();
    }
  }, [moreInfo]);

  return (
    <div>
      <div>
        <span>닉네임 설정</span>
      </div>
      <div>
        <input
          type="text"
          placeholder="닉네임 설정 2 ~ 10자"
          onChange={(e) => {
            setMoreInfo((prev) => {
              let curr = { ...prev };
              curr["nickname"] = e.target.value;
              return curr;
            });
          }}
        />
      </div>
      <div>
        <button onClick={viewHandler}>위치 설정</button>
      </div>
      <div>
        {isClicked ? (
          <DaumPostcodeEmbed onComplete={completeHandler} autoClose={false} />
        ) : (
          <ShowAddress add={moreInfo} />
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
