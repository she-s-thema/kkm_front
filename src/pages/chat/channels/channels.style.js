import styled from "styled-components";

export const ChatBox = styled.div`
  display: flex;
  width: 30%;
  margin-top: 10px;
`;

export const Name = styled.div`
  display: flex;
  color: black;
`;

export const ChatCards = styled.div`
  width: 100%;
`;

export const ChatCard = styled.div`
  display: flex;
  height: 40%;
  width: 100%;
  padding: 15px;
  background-color: ${({ isClicked }) => (isClicked ? "#f4f4f4" : "white")};
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 12px;
`;

export const ChatProfile = styled.img`
  display: flex;
  width: 15%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
`;

export const ChatContent = styled.h6`
  color: black;
  max-width: 70%;
  font-weight: 400;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatName = styled.h5`
  color: black;
  font-size: 13px;
`;

export const UserInfo = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  justify-content: center;
  margin-left: 13px;
`;

export const SubInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

export const Time = styled.span`
  color: #808080;
  font-size: 11px;
`;

export const MidLine = styled.span`
  color: #808080;
  font-size: 11px;
`;
