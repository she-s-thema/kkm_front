import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BackButton } from "../../../components/BackButton";
import db from "../../../config/firebaseConfig";
import { channelId } from "../../../data/chat";
import { userInfo } from "../../../data/user";
import { CustomAxios } from "../../../utils/customAxios";
import { cancelHeart, isMyJjam, raiseHeart } from "../../../utils/heart";
import { timeDifference } from "../../../utils/timeDifference";
import * as S from "./detail.style";

export const PostDetail = () => {
  const imgRef = useRef(null);
  const user = useRecoilValue(userInfo);
  const { post_id } = useParams();
  const [curImgIndex, setCurImgIndex] = useState(1);
  const [imgMax, setImgMax] = useState(1);
  const [dataInfo, setDataInfo] = useState();
  const [postOwnerInfo, setPostOwnerInfo] = useState();
  const [isHeart, setIsHeart] = useState(false);
  const [, setSChannelId] = useRecoilState(channelId);

  const getDetailInfo = async () => {
    await CustomAxios.get(`/post/getDetail?post_id=${post_id}`).then((data) => {
      if (data.data["image_2"] !== "") setImgMax(2);
      if (data.data["image_3"] !== "") setImgMax(3);
      const time = timeDifference(data.data["write_time"]);
      setDataInfo({ ...data.data, write_time: time });
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
    setTimeout(() => {
      setIsHeart((h) => !h);
      getDetailInfo();
    }, 500);
  };

  useEffect(() => {
    getDetailInfo();
  }, [isHeart]);

  const slideImg = (side) => {
    if (curImgIndex < 4) {
      if (side) {
        setCurImgIndex((prev) => prev + 1);
        imgRef.current.style.transform = `translateX(-${curImgIndex}00%)`;
      } else {
        setCurImgIndex((prev) => prev - 1);
        imgRef.current.style.transform = `translateX(-${curImgIndex - 2}00%)`;
      }
    }
  };

  return (
    <>
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
            <S.ImgSlider>
              {dataInfo["image_2"] !== "" && (
                <S.ArrowBox>
                  <img
                    src={
                      curImgIndex !== 1
                        ? "../../assets/icons/left-arrow.png"
                        : ""
                    }
                    onClick={() => slideImg(false)}
                  />
                  <img
                    src={
                      curImgIndex !== 3
                        ? "../../assets/icons/right-arrow.png"
                        : ""
                    }
                    style={{
                      display:
                        curImgIndex === 3 || curImgIndex === imgMax
                          ? "none"
                          : null,
                    }}
                    onClick={() => slideImg(true)}
                  />
                </S.ArrowBox>
              )}
              <S.ImageBox ref={imgRef}>
                <S.Image src={dataInfo["image_1"]} />
                {dataInfo["image_2"] !== "" && (
                  <S.Image src={dataInfo["image_2"]} />
                )}
                {dataInfo["image_3"] !== "" && (
                  <S.Image src={dataInfo["image_3"]} />
                )}
              </S.ImageBox>
            </S.ImgSlider>
            <S.Head>
              <S.LeftInfoBox>
                <S.SubInfo>
                  <MdLocationOn />
                  {postOwnerInfo[0].address}
                  <S.Dot>∙</S.Dot>
                  {dataInfo["write_time"]}
                </S.SubInfo>
                <S.Title>{dataInfo["title"]}</S.Title>
              </S.LeftInfoBox>
              <S.Cost>{dataInfo["cost"]}원</S.Cost>
            </S.Head>
            <S.ChatBtn onClick={newChannel}>대화하기</S.ChatBtn>

            <S.Line />
            <S.DescBox
              dangerouslySetInnerHTML={{ __html: dataInfo["description"] }}
            ></S.DescBox>
            <S.Line />
            <S.Title>추천 게시물</S.Title>
          </S.Article>
        </S.ArticleBox>
      )}
    </>
  );
};
