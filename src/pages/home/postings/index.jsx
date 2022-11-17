import React from "react";
import { UserLocation } from "../UserLocation";
import { Link } from "react-router-dom";
import * as S from "./postings.style";
export const Postings = ({ posts }) => {
  return (
    <S.Article>
      <UserLocation />
      <S.Cards>
        {posts !== "" &&
          posts.map((data) => {
            const card = (
              <Link
                key={data.post_id}
                to={`/post/${data.post_id}`}
                style={{ textDecoration: "none" }}
              >
                <S.Card key={data.post_id}>
                  <S.Image src={data.image_1} />
                  <S.Title>{data.title}</S.Title>
                  <S.Address>{data.address}</S.Address>
                  <S.EndPoint>
                    <span>{data.cost}원</span>
                    <S.Heart>
                      <S.HeartIcon src="../../assets/icons/heart.png" />
                      <span>{data.heart}</span>
                    </S.Heart>
                  </S.EndPoint>
                </S.Card>
              </Link>
            );
            return card;
          })}
      </S.Cards>
    </S.Article>
  );
};
