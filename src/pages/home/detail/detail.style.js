import styled from "styled-components";

export const Frame = styled.div`
  display: flex;
  width: 100%;
  height: 45vw;
  justify-content: center;
  align-items: center;
`;

export const ArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  background-color: #f6f6f6;
`;

export const UserBox = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  background-color: white;
`;

export const Article = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  aspect-ratio: 1.5 / 1;
  justify-content: space-between;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 38%;
  height: 95%;
  margin-top: 10px;
  gap: 10px;
  justify-content: space-around;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: contain;
  background-color: black;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const KProfileImg = styled.img`
  width: 4%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 100px;
`;

export const Nickname = styled.span`
  margin-left: 10px;
`;

export const Title = styled.span`
  line-height: 100%;
  font-weight: 500;
  font-size: 24px;
`;

export const SubTitle = styled.span`
  font-weight: 700;
  font-size: 15px;
`;

export const Cost = styled.div`
  display: flex;
  background-color: white;
  width: 60%;
  padding: 3% 3%;
  border-radius: 7px;
  justify-content: space-between;
`;

export const Desc = styled.div`
  background-color: white;
  width: 89%;
  height: 40%;
  padding: 3% 3%;
  border-radius: 7px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: flex-end;
`;

export const ChatBtn = styled.button`
  height: 100%;
  width: 95%;
  border: none;
  color: white;
  background: #595fff;
  border-radius: 35px;
  cursor: pointer;
`;

export const Heart = styled.div`
  display: flex;
  align-items: center;
  color: #646fd4;
`;

export const HeartIcon = styled.img`
  width: 20px;
  margin-top: 1px;
  margin-right: 4px;
`;

export const InfoHead = styled.section`
  display: flex;
  width: 95%;
  align-items: center;
  justify-content: space-between;
`;
