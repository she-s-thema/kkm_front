import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BackButton } from "../../components/BackButton";

export const PostDetail = () => {
  const post_id = window.location.pathname.slice(6);
  const [dataInfo, setDataInfo] = useState({
    cost: 0,
    description: "",
    image_1: "../../assets/images/loading.png",
    image_2: "",
    image_3: "",
    post_id: post_id,
    post_owner_id: 0,
    state: 0,
    title: "",
    type: 0,
    writetime: "",
  });
  const [postOwnerInfo, setPostOwnerInfo] = useState([
    { nickname: "", k_img_url: "../../assets/images/loading.png" },
  ]);

  const getDetailInfo = async () => {
    await axios.get(`/post/getDetail?post_id=${post_id}`).then((data) => {
      setDataInfo(data.data);
    });

    await axios
      .get(`/getUserProfile/${post_id}`)
      .then((data) => setPostOwnerInfo(data.data));
  };
  useEffect(() => {
    getDetailInfo();
  }, []);
  return (
    <Frame>
      <ArticleBox>
        <UserBox>
          <BackButton />
          <KProfileImg src={postOwnerInfo[0].k_img_url} />
          <Nickname>{postOwnerInfo[0].nickname}</Nickname>
        </UserBox>
        <Article>
          <ImageBox>
            {dataInfo["image_1"] !== "" && <Image src={dataInfo["image_1"]} />}
            {/* {dataInfo["image_2"] !== "" && <Image src={dataInfo["image_2"]} />} */}
            {/* {dataInfo["image_3"] !== "" && <Image src={dataInfo["image_3"]} />} */}
          </ImageBox>
          <Info>
            <Title>{dataInfo["title"]}</Title>
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
              <ChatBtn>대화하기</ChatBtn>
            </ButtonBox>
          </Info>
        </Article>
      </ArticleBox>
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
  font-size: 30px;
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
