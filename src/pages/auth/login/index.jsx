import React from "react";

export const Login = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  return (
    <main>
      <div>
        <a href={KAKAO_AUTH_URL}>카카오로 로그인하기</a>
      </div>
    </main>
  );
};
