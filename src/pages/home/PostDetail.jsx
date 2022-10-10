import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { BackButton } from "../../components/BackButton";
import db from "../../config/firebaseConfig";
import { userInfo } from "../../data/user";

export const PostDetail = () => {
  const user = useRecoilValue(userInfo);
  const { post_id } = useParams();
  const [dataInfo, setDataInfo] = useState();
  const [postOwnerInfo, setPostOwnerInfo] = useState([
    { nickname: "", k_img_url: "../../assets/images/loading.png" },
  ]);
  const [heart, setHeart] = useState(0);

  const getDetailInfo = async () => {
    await axios.get(`/post/getDetail?post_id=${post_id}`).then((data) => {
      setDataInfo(data.data);
    });

    await axios
      .get(`/getUserProfile/${post_id}`)
      .then((data) => setPostOwnerInfo(data.data));

    await axios.get(`/heart/${post_id}`).then((hea) => setHeart(hea.data));
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

      if (!querySnapshot.empty) {
        querySnapshot.forEach(
          (doc) => (window.location.href = `/chat/${doc.data().id}`)
        );
      } else if (!querySnapshot2.empty) {
        querySnapshot2.forEach(
          (doc) => (window.location.href = `/chat/${doc.data().id}`)
        );
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
        });
        window.location.href = `/chat/${newChRef.id}`;
      }
    }
  };

  useEffect(() => {
    getDetailInfo();
  }, []);
  return (
    <Frame>
      {dataInfo && (
        <ArticleBox>
          <UserBox>
            <BackButton />
            <KProfileImg src={postOwnerInfo[0].k_img_url} />
            <Nickname>{postOwnerInfo[0].nickname}</Nickname>
          </UserBox>
          <Article>
            <ImageBox>
              {dataInfo["image_1"] !== "" && (
                <Image src={dataInfo["image_1"]} />
              )}
              {/* {dataInfo["image_2"] !== "" && <Image src={dataInfo["image_2"]} />} */}
              {/* {dataInfo["image_3"] !== "" && <Image src={dataInfo["image_3"]} />} */}
            </ImageBox>
            <Info>
              <InfoHead>
                <Title>{dataInfo["title"]}</Title>
                <Heart>
                  <HeartIcon src="../../assets/icons/heart.png" />
                  <span>{heart}</span>
                </Heart>
              </InfoHead>
              <SubTitle>대여 가격</SubTitle>
              <Cost>
                <span>{dataInfo["cost"]}</span>
                <span>₩</span>
              </Cost>
              <SubTitle>상품 설명</SubTitle>
              <Desc>
                <span>{dataInfo["description"]}</span>
              </Desc>
              <ButtonBox>
                <ChatBtn onClick={newChannel}>대화하기</ChatBtn>
              </ButtonBox>
            </Info>
          </Article>
        </ArticleBox>
      )}
    </Frame>
  );
};

const Frame = styled.div`
  display: flex;
  width: 100%;
  height: 45vw;
  justify-content: center;
  align-items: center;
`;

const ArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  background-color: #f6f6f6;
`;

const UserBox = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  background-color: white;
`;

const Article = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  aspect-ratio: 1.5 / 1;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 38%;
  height: 95%;
  margin-top: 10px;
  gap: 10px;
  justify-content: space-around;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  background-color: black;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const KProfileImg = styled.img`
  width: 4%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 100px;
`;

const Nickname = styled.span`
  margin-left: 10px;
`;

const Title = styled.span`
  line-height: 100%;
  font-weight: 500;
  font-size: 24px;
`;

const SubTitle = styled.span`
  font-weight: 700;
  font-size: 15px;
`;

const Cost = styled.div`
  display: flex;
  background-color: white;
  width: 60%;
  padding: 3% 3%;
  border-radius: 7px;
  justify-content: space-between;
`;

const Desc = styled.div`
  background-color: white;
  width: 89%;
  height: 40%;
  padding: 3% 3%;
  border-radius: 7px;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: flex-end;
`;

const ChatBtn = styled.button`
  height: 100%;
  width: 95%;
  border: none;
  color: white;
  background: #595fff;
  border-radius: 35px;
  cursor: pointer;
`;

const Heart = styled.div`
  display: flex;
  align-items: center;
  color: #646fd4;
`;

const HeartIcon = styled.img`
  width: 20px;
  margin-top: 1px;
  margin-right: 4px;
`;

const InfoHead = styled.section`
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: space-between;
`;
