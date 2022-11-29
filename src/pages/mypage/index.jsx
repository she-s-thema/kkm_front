import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import { CustomAxios } from "../../utils/customAxios";
import { getUserDeals } from "../../utils/promise";
import { Card } from "./card";
import { JjamList } from "./jjam";
import * as S from "./mypage.style";
import { Profile } from "./profile";

export const Mypage = () => {
  const user_id = useRecoilValue(userInfo)["user_id"];
  const [userDetail, setUserDetail] = useState();
  const [userDeals, setUserDeals] = useState();
  const [jjamList, setJjamList] = useState();
  const [postList, setPostList] = useState();

  const getDatas = async () => {
    await CustomAxios.get(`/getUserInfo/${user_id}`).then((data) => {
      setUserDetail(data.data[0]);
    });

    getUserDeals(user_id).then((data) => setUserDeals(data));

    await CustomAxios.get(`/jjamList?user_id=${user_id}`).then((data) => {
      setJjamList(data.data);
    });

    await CustomAxios.get(`/getPostInfo/${user_id}`).then((data) => {
      setPostList(data.data);
    });
  };

  const query = useQuery(["userInfo"], getDatas);

  return (
    <S.Frame>
      {query.isSuccess && userDetail ? (
        <>
          <Profile info={userDetail} />
          <Card kkm={userDetail["kkm"]} deals={userDeals} />
          <S.Banner>
            <S.BannerIcon src="../../../assets/icons/heart-red.png" />
            <span>쨈한 게시물</span>
          </S.Banner>
          <JjamList list={jjamList} />
          <S.Banner>
            <S.BannerIcon src="../../../assets/icons/post.png" />
            <span>내 게시물</span>
          </S.Banner>
          <JjamList list={postList} />
        </>
      ) : null}
    </S.Frame>
  );
};
