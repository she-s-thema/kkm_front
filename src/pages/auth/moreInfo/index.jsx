import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { kakaoUserInfo, userInfo } from "../../../data/user";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import { CustomAxios } from "../../../utils/CustomAxios";

export const MoreInfo = () => {
  const newUser = new FormData();
  const { kakao } = window;
  const user = useRecoilValue(kakaoUserInfo);
  const [ggmInfo, setGgmInfo] = useRecoilState(userInfo);
  const [isClicked, setIsClicked] = useState(false);
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");

  const completeHandler = (data) => {
    // 위치 선택이 끝난 후
    setAddress(data["address"]);
    setIsClicked(false);
  };

  const signUp = async () => {
    // 폼 데이터 서버로 전송
    await CustomAxios.post(`/user/join`, newUser).then((res) => {
      setAuthorizationToken(res.data);
      setGgmInfo(jwtDecode(res.data));
      localStorage.setItem("token", res.data);
    });

    window.location.href = "/";
  };

  useEffect(() => {
    if (address !== "") {
      // setAddress가 실행됐을 때
      newUser.append("user_id", "0");
      newUser.append("k_id", user["k_id"]);
      newUser.append("k_img_url", user["k_img_url"].replace(/['"]/g, ""));
      newUser.append("nickname", nickname);
      newUser.append("kkm", 0);
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
    <LoginBox>
      <Article>
        <div>
          <ProfileImg src={user["k_img_url"].replace(/['"]/g, "")} />
        </div>
        <Nickname>
          <div>
            <span>닉네임 설정</span>
          </div>
          <div>
            <Input
              type="text"
              placeholder="닉네임 설정 2 ~ 10자"
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>
        </Nickname>
        <div>
          <Pbutton
            onClick={() => {
              setIsClicked((prev) => !prev);
            }}
          >
            위치 설정
          </Pbutton>
          {isClicked && (
            <DaumPostcodeEmbed onComplete={completeHandler} autoClose={false} />
          )}
          {address}
        </div>
        <div>
          <Sbutton type="button" onClick={signUp}>
            회원가입
          </Sbutton>
        </div>
      </Article>
    </LoginBox>
  );
};

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  object-fit: cover;
`;

const Article = styled.div`
  width: 17%;
  height: 50%;
  padding: 4% 10% 4% 10%;
  background-color: #e9f0ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const LoginBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Input = styled.input`
  border: 0;
  padding: 5px;
  padding-left: 10px;
  width: 60%;
  border-radius: 15px;
  width: 185px;
  height: 20px;
`;

const Nickname = styled.div`
  width: 100%;
`;

const Pbutton = styled.button`
  display: flex;
  border: 0;
  background-color: #e9f0ff;
  font-size: 16px;
`;

const Sbutton = styled.button`
  display: flex;
  border: 0;
  background-color: #6573f5;
  color: #fff;
  width: 200px;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
`;
