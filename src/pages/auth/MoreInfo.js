import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfo } from "../../data/atom";

export const MoreInfo = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [nickname, setNickname] = useState("");

  const setName = ({ target: { value } }) => {
    setNickname(value);
  };

  const signUp = () => {
    // setUser(prev => {userInfo: {
    //   ...userInfo
    // }});
    // console.log(user);
  };

  return (
    <div>
      <div>
        <span>닉네임 설정</span>
      </div>
      <div>
        <input
          type="text"
          placeholder="닉네임 설정 2 ~ 10자"
          onChange={setName}
        />
      </div>
      <div>
        <button type="button" onClick={signUp}>
          회원가입
        </button>
      </div>
    </div>
  );
};
