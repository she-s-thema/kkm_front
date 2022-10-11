import React from "react";
import { UserLocation } from "./UserLocation";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Postings = ({ posts }) => {
  return (
    <Article>
      <UserLocation />
      <Cards>
        {posts !== "" &&
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
                  <Address>{data.address}</Address>
                  <EndPoint>
                    <span>{data.cost}원</span>
                    <Heart>
                      <HeartIcon src="../../assets/icons/heart.png" />
                      <span>{data.heart}</span>
                    </Heart>
                  </EndPoint>
                </Card>
              </Link>
            );
            return card;
          })}
      </Cards>
    </Article>
  );
};

const Article = styled.article`
  width: 50%;
  height: 100%;
  padding: 0 10% 10% 10%;
  background-color: white;
`;

const Cards = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-gap: 2%;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  text-decoration: none;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  transition: 0.2s ease;
  &:hover {
    transition: 0.2s ease;
    transform: scale(1.05);
  }
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
