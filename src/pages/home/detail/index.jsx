import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BackButton } from "../../../components/BackButton";
import db from "../../../config/firebaseConfig";
import { channelId } from "../../../data/chat";
import { userInfo } from "../../../data/user";
import { CustomAxios } from "../../../utils/CustomAxios";
import * as S from "./detail.style";

export const PostDetail = () => {
  const user = useRecoilValue(userInfo);
  const { post_id } = useParams();
  const [dataInfo, setDataInfo] = useState();
  const [postOwnerInfo, setPostOwnerInfo] = useState([
    { nickname: "", k_img_url: "../../assets/images/loading.png" },
  ]);
  const [heart, setHeart] = useState(0);
  const [sChannelId, setSChannelId] = useRecoilState(channelId);

  const getDetailInfo = async () => {
    await CustomAxios.get(`/post/getDetail?post_id=${post_id}`).then((data) => {
      setDataInfo(data.data);
    });

    await CustomAxios.get(`/getUserProfile/${post_id}`).then((data) =>
      setPostOwnerInfo(data.data)
    );

    await CustomAxios.get(`/heart/${post_id}`).then((hea) =>
      setHeart(hea.data)
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

  useEffect(() => {
    getDetailInfo();
  }, []);
  return (
    <S.Frame>
      {dataInfo && (
        <S.ArticleBox>
          <S.UserBox>
            <BackButton />
            <S.KProfileImg src={postOwnerInfo[0].k_img_url} />
            <S.Nickname>{postOwnerInfo[0].nickname}</S.Nickname>
          </S.UserBox>
          <S.Article>
            <S.ImageBox>
              {dataInfo["image_1"] !== "" && (
                <S.Image src={dataInfo["image_1"]} />
              )}
              {/* {dataInfo["image_2"] !== "" && <Image src={dataInfo["image_2"]} />} */}
              {/* {dataInfo["image_3"] !== "" && <Image src={dataInfo["image_3"]} />} */}
            </S.ImageBox>
            <S.Info>
              <S.InfoHead>
                <S.Title>{dataInfo["title"]}</S.Title>
                <S.Heart>
                  <S.HeartIcon src="../../assets/icons/heart.png" />
                  <span>{heart}</span>
                </S.Heart>
              </S.InfoHead>
              <S.SubTitle>대여 가격</S.SubTitle>
              <S.Cost>
                <span>{dataInfo["cost"]}</span>
                <span>₩</span>
              </S.Cost>
              <S.SubTitle>상품 설명</S.SubTitle>
              <S.Desc>
                <span>{dataInfo["description"]}</span>
              </S.Desc>
              <S.ButtonBox>
                <S.ChatBtn onClick={newChannel}>대화하기</S.ChatBtn>
              </S.ButtonBox>
            </S.Info>
          </S.Article>
        </S.ArticleBox>
      )}
    </S.Frame>
  );
};
