import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BackButton } from "../../../components/BackButton";
import db from "../../../config/firebaseConfig";
import { channelId } from "../../../data/chat";
import { userInfo } from "../../../data/user";
import { CustomAxios } from "../../../utils/customAxios";
import { cancelHeart, isMyJjam, raiseHeart } from "../../../utils/heart";
import * as S from "./detail.style";

export const PostDetail = () => {
  const user = useRecoilValue(userInfo);
  const { post_id } = useParams();
  const [dataInfo, setDataInfo] = useState();
  const [postOwnerInfo, setPostOwnerInfo] = useState();
  const [isHeart, setIsHeart] = useState(false);
  const [sChannelId, setSChannelId] = useRecoilState(channelId);

  const getDetailInfo = async () => {
    await CustomAxios.get(`/post/getDetail?post_id=${post_id}`).then((data) => {
      setDataInfo(() => data.data);
    });

    await CustomAxios.get(`/getUserProfile/${post_id}`).then((data) =>
      setPostOwnerInfo(() => data.data)
    );

    isMyJjam(post_id, user["user_id"]).then((data) =>
      data ? setIsHeart(true) : null
    );
  };

  const newChannel = async () => {
    if (postOwnerInfo[0].user_id === user["user_id"]) {
      alert("자기 자신과의 대화는 중요하죠.");
    } else {
      const q = query(
        collection(db, "channels"),
        where("loaner_id", "==", user["user_id"]),
        where("owner_id", "==", postOwnerInfo[0].user_id)
      );

      const q2 = query(
        collection(db, "channels"),
        where("loaner_id", "==", postOwnerInfo[0].user_id),
        where("owner_id", "==", user["user_id"])
      );

      const querySnapshot = await getDocs(q);
      const querySnapshot2 = await getDocs(q2);

      if (!querySnapshot.empty || !querySnapshot2.empty) {
        querySnapshot.forEach((doc) => {
          setSChannelId(doc.data().id);
          window.location.href = `/chat`;
        });
      } else {
        const newChRef = doc(collection(db, "channels"));
        const createdTime = new Date();
        await setDoc(newChRef, {
          id: newChRef.id,
          createdAt: createdTime,
          loaner_id: user["user_id"],
          loaner_profile: user["k_img_url"],
          loaner_name: user["nickname"],
          owner_id: postOwnerInfo[0].user_id,
          owner_profile: postOwnerInfo[0].k_img_url,
          owner_name: postOwnerInfo[0].nickname,
          post_id: dataInfo["post_id"],
          post_cost: dataInfo["cost"],
          thumbnail: dataInfo["image_1"],
        });
        setSChannelId(newChRef.id);
        window.location.href = `/chat`;
      }
    }
  };

  const handleHeart = () => {
    if (isHeart) {
      cancelHeart(post_id, user["user_id"]);
    } else raiseHeart(post_id, postOwnerInfo[0].user_id, user["user_id"]);
    setIsHeart((h) => !h);
    getDetailInfo();
  };

  useEffect(() => {
    getDetailInfo();
  }, [isHeart]);

  return (
    <S.Frame>
      {dataInfo && postOwnerInfo && (
        <S.ArticleBox>
          <S.UserBox>
            <BackButton />
            <S.KProfileImg src={postOwnerInfo[0].k_img_url} />
            <S.Container>
              <S.Nickname>{postOwnerInfo[0].nickname}</S.Nickname>
              <S.Heart onClick={handleHeart}>
                <S.HeartNum>{dataInfo["heart"]}</S.HeartNum>
                {isHeart ? (
                  <S.HeartIcon src={`../../assets/icons/heart.png`} />
                ) : (
                  <S.HeartIcon src={`../../assets/icons/heart-empty.png`} />
                )}
              </S.Heart>
            </S.Container>
          </S.UserBox>
          <S.Article>
            <S.ImageBox>
              {dataInfo["image_1"] !== "" && (
                <S.Image src={dataInfo["image_1"]} />
              )}
              {/* {dataInfo["image_2"] !== "" && <Image src={dataInfo["image_2"]} />} */}
              {/* {dataInfo["image_3"] !== "" && <Image src={dataInfo["image_3"]} />} */}
            </S.ImageBox>
            <S.Head>
              <S.LeftInfoBox>
                <S.SubInfo>
                  <MdLocationOn />
                  {postOwnerInfo[0].address}
                  {moment(dataInfo["write_time"]).format("MM월 DD일 hh시 mm분")}
                </S.SubInfo>
                <S.Title>{dataInfo["title"]}</S.Title>
              </S.LeftInfoBox>
              <S.Cost>{dataInfo["cost"]}원</S.Cost>
            </S.Head>
            <S.Line />
            <S.DescBox>{dataInfo["description"]}</S.DescBox>
            <S.Line />
            <S.Title>추천 게시물</S.Title>
          </S.Article>
        </S.ArticleBox>
      )}
    </S.Frame>
  );
};

{
  /* <S.ChatBtn onClick={newChannel}>대화하기</S.ChatBtn> */
}
