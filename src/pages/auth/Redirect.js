import React, { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userInfo } from "../../data/atom";

export const Redirect = () => {
  const [user, setUser] = useRecoilState(userInfo);

  const isSignUpUser = async (k_id) => {
    console.log(k_id);
    await axios.post(`/user/kakaoLogin?k_id=${k_id}`).then((res) => {
      if (res.data === "guest") {
        window.location.href = "/login/moreInfo";
      } else {
        window.location.href = "/";
      }
      console.log(res.data);
    });
  };

  const getKakaoUserInfo = async (code) => {
    await axios.get(`/user/getKakaoUserInfo?code=${code}`).then((res) => {
      setUser({
        user_id: 0,
        nickname: "",
        k_id: res.data["k_id"],
        k_img_url: res.data["k_img_url"],
      });
      console.log(res.data["k_id"]);
      isSignUpUser(res.data["k_id"]);
    });
  };

  useEffect(() => {
    const query = queryString.parse(window.location.search); // params 값을 key-value로 가져옴

    getKakaoUserInfo(query.code);
  }, []);
  return <></>;
};
