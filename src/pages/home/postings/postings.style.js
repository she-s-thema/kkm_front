import styled from "styled-components";

export const Article = styled.article`
  width: 50%;
  height: 100%;
  padding: 0 10% 10% 10%;
  background-color: white;
`;

export const Cards = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-gap: 2%;
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  text-decoration: none;
`;

export const Image = styled.img`
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

export const Title = styled.p`
  color: black;
  text-decoration: none;
  display: block;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Address = styled.p`
  color: #828282;
  font-size: 0.8rem;
`;

export const EndPoint = styled.div`
  display: flex;
  color: #646fd4;
`;

export const Heart = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-weight: 300;
  line-height: 16px;
`;

export const HeartIcon = styled.img`
  width: 16px;
  margin-top: 1px;
  margin-right: 4px;
`;
