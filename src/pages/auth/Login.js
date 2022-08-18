import React from "react";
import { REST_API_KEY, REDIRECT_URI } from "../../utils/kakaoLoginConfig";

export const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <main>
      <div>
        {/* <img/> */}
        <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a>
      </div>
    </main>
  );
};
