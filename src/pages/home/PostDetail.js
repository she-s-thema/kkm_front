import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BackButton } from "../../components/BackButton";

export const PostDetail = () => {
  const post_id = window.location.pathname.slice(6);
  const [dataInfo, setDataInfo] = useState({
    cost: 0,
    description: "",
    image_1: "",
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
    { nickname: "", k_img_url: "" },
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
          <BackButton back={"/"} />
          <KProfileImg src={postOwnerInfo[0].k_img_url} />
          <Nickname>{postOwnerInfo[0].nickname}</Nickname>
        </UserBox>
        <Article>
          {dataInfo["image_1"] !== "" && <Image src={dataInfo["image_1"]} />}
          {/* {dataInfo["image_2"] !== "" && <Image src={dataInfo["image_2"]} />} */}
          {/* {dataInfo["image_3"] !== "" && <Image src={dataInfo["image_3"]} />} */}
          <Info>
            <h3>{dataInfo["title"]}</h3>
            <span>대여 가격</span>
            <Cost>
              <span>{dataInfo["cost"]}</span>
              <span>₩</span>
            </Cost>
            <span>{dataInfo["description"]}</span>
          </Info>
        </Article>
      </ArticleBox>
    </Frame>
  );
};

const Frame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const ArticleBox = styled.div`
  width: 70%;
  height: 90vh;
  padding-top: 10px;
  background-color: white;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const Article = styled.div`
  display: flex;
  aspect-ratio: 2 / 1;
  justify-content: space-between;
  margin-top: 10px;
`;

const KProfileImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100px;
`;

const Nickname = styled.span`
  margin-left: 15px;
`;

const Image = styled.img`
  width: 49%;
  height: 100%;
  object-fit: contain;
  aspect-ratio: auto 1 / 1;
  background-color: black;
`;

const Info = styled.div`
  width: 49%;
  height: 100%;
  margin-top: 10px;
`;

const Cost = styled.div`
  background-color: gray;
  width: 90%;
`;
