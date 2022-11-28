import styled from "styled-components";

export const Frame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 46%;
  height: 100%;
  padding: 10px 2%;
  row-gap: 15px;
  background-color: #ffffff;
`;

export const UserBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: white;
`;

export const Container = styled.div`
  display: flex;
  width: 86%;
  align-items: center;
  justify-content: space-between;
`;

export const Article = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  height: 100%;
  row-gap: 15px;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
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

export const ImageBox = styled.div`
  display: flex;
  min-width: 100%;
  align-items: center;
  width: 100%;
  aspect-ratio: 4 / 3;
  transition: all 0.5s ease;
`;

export const Image = styled.img`
  border-radius: 10px;
  aspect-ratio: 4 / 3;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: black;
`;

export const KProfileImg = styled.img`
  width: 6%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 100px;
`;

export const Nickname = styled.span`
  margin-left: 10px;
`;

export const Heart = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #646fd4;
`;

export const HeartIcon = styled.img`
  width: 17%;
  margin-left: 0.8rem;
`;

export const HeartNum = styled.span`
  font-weight: bolder;
`;

export const Head = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const LeftInfoBox = styled.div`
  display: flex;
  row-gap: 6px;
  flex-direction: column;
  width: 70%;
`;

export const SubInfo = styled.div`
  display: flex;
  align-items: center;
  color: #828282;
  font-size: 80%;
`;

export const Cost = styled.span`
  line-height: 90%;
  font-size: 250%;
  font-weight: 500;
`;

export const Title = styled.span`
  font-weight: 500;
`;

export const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: #b6b6b6;
`;

export const DescBox = styled.div`
  padding: 1% 2%;
  color: #343434;
`;

export const ChatBtn = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #595fff;
  color: white;
  font-size: 120%;
  font-weight: 500;
  &:hover {
    background-color: #383ecb;
    color: #ededed;
  }
`;

export const Dot = styled.span`
  margin: 0 5px;
`;

export const ArrowBox = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  width: 44%;
  padding: 0 1%;
  height: 30px;
  justify-content: space-between;
`;

export const ImgSlider = styled.div`
  display: flex;
  min-width: 100%;
  align-items: center;
  height: 100%;
`;
