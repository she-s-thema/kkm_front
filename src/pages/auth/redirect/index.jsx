import React, { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import { useRecoilState } from "recoil";
import { kakaoUserInfo, userInfo } from "../../../data/user";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { getUserId } from "../../../utils/getUserId";

export const Redirect = () => {
  const [user, setUser] = useRecoilState(kakaoUserInfo);
  const [ggmInfo, setGgmInfo] = useRecoilState(userInfo);

  const isSignUpUser = async (k_id) => {
    await axios.post(`/user/kakaoLogin?k_id=${k_id}`).then((res) => {
      if (res.data === "guest") {
        window.location.href = "/login/moreInfo";
      } else {
        const token = res.data;
        localStorage.setItem("token", token);
        setAuthorizationToken(token);
        setGgmInfo(jwtDecode(token));
        getUserId(jwtDecode(token)["k_id"]).then((id) =>
          setUser({
            ...user,
            user_id: id,
          })
        );

        window.location.href = "/";
      }
    });
  };

  const getKakaoUserInfo = async (code) => {
    await axios.get(`/user/getKakaoUserInfo?code=${code}`).then((res) => {
      setUser({
        user_id: "0",
        nickname: "",
        k_id: String(res.data["k_id"]),
        k_img_url: res.data["k_img_url"],
      });
      isSignUpUser(res.data["k_id"]);
    });
  };

  useEffect(() => {
    const query = queryString.parse(window.location.search); // params 값을 key-value로 가져옴

    getKakaoUserInfo(query.code);
  }, []);
  return <>로딩중</>;
};
