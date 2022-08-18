import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfo } from "../../data/atom";

export const MoreInfo = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [nickname, setNickname] = useState("");

  const setName = ({ target: { value } }) => {
    setNickname(value);
  };

  const saveNickname = async () => {
    setUser((prev) => {
      let newInfo = { ...prev };
      newInfo["nickname"] = nickname;
      return newInfo;
    });
  };

  const signUp = async () => {
    const newUser = new FormData();
    newUser.append("user_id", "0");
    newUser.append("nickname", user["nickname"]);
    newUser.append("k_id", user["k_id"]);
    newUser.append("k_img_url", user["k_img_url"]);
    newUser.append("k_email", user["k_email"]);

    await axios
      .post(`/user/join`, newUser)
      .then((res) => console.log(res.data));
  };

  useEffect(() => {
    if (user["nickname"] !== "") {
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
          onChange={setName}
        />
      </div>
      <div>
        <button type="button" onClick={saveNickname}>
          회원가입
        </button>
      </div>
    </div>
  );
};
