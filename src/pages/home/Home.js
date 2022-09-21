import React, { useEffect, useState } from "react";
import pl from "../../data/postList.json";
import styled from "styled-components";
import { UserLocation } from "./UserLocation";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import axios from "axios";

export const Home = () => {
  const user = useRecoilValue(userInfo);
  const API_ADD = `/post/townlist?lon=${user["lon"]}&lat=${user["lat"]}`;
  const [posts, setPosts] = useState("");
  const getPosts = async () => {
    await axios.get(API_ADD).then((data) => {
      setPosts(() => data["data"]);
    });
  };

  useEffect(() => {
    if (posts === "") getPosts();
    else;
  }, [posts]);

  return (
    <HomeBox>
      <Article>
        <UserLocation />
        <Cards>
          {posts !== "" ? (
            posts.map((data) => {
              const card = (
                <Link
                  key={data.post_id}
                  to={`/post/${data.post_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card key={data.post_id}>
                    <Image src={data.image_1} />
                    <Title>{data.title}</Title>
                    {/* <Address>{data.ownerLocatiousern}</Address> */}
                    <EndPoint>
                      <span>{data.cost}원</span>
                      <Heart>
                        <HeartIcon src="../../assets/icons/heart.png" />
                        {/* <span>{data.heart}</span> */}
                      </Heart>
                    </EndPoint>
                  </Card>
                </Link>
              );
              return card;
            })
          ) : (
            <></>
          )}
        </Cards>
      </Article>
    </HomeBox>
  );
};

const HomeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Article = styled.article`
  width: 50%;
  padding: 0 10% 10% 10%;
  background-color: white;
`;

const Cards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 31.2% 31.2% 31.2%;
  grid-gap: 1.2rem;
`;

const Card = styled.div`
  width: 100%;
  text-decoration: none;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 280px;
  border-radius: 5px;
`;

const Title = styled.p`
  color: black;
  text-decoration: none;
  display: block;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Address = styled.p`
  color: #828282;
  font-size: 0.8rem;
`;

const EndPoint = styled.div`
  display: flex;
  color: #646fd4;
`;

const Heart = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-weight: 300;
  line-height: 16px;
`;

const HeartIcon = styled.img`
  width: 16px;
  margin-top: 1px;
  margin-right: 4px;
`;
