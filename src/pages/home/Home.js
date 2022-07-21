import React from 'react'
import pl from '../../data/postList.json';
import styled from "styled-components";
import { UserLocation } from './UserLocation';

export const Home = () => {
  return (
    <HomeBox>
      <Article>
        <UserLocation />
        <Cards>
          {pl.map(data => {
            const card = <Card key={data.id}>
              <Image src={data.imgSrc[0]} />
              <Title>{data.title}</Title>
              <Address>{data.ownerLocation}</Address>
              <EndPoint>
                <span>{data.rentalPrice}원</span>
                <Heart>
                  <HeartIcon src="../../assets/icons/heart.png" />
                  <span>{data.heart}</span>
                </Heart>
              </EndPoint>
            </Card>
            return card;
          })}
        </Cards>
      </Article>
    </HomeBox>
  )
}

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
  grid-gap: 1rem;
`;

const Card = styled.div`
  width: 100%; 
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 280px;
  border-radius: 5px;
`;

const Title = styled.p`
  display: block;
  font-size: 1.2rem;
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
  color: #646FD4;
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