import styled from "styled-components";

export const ChatBox = styled.div`
  display: block;
  width: 330px;
  height: 520px;
  border: 1px solid #c4c4c4;
  border-top: 0px;
`;

export const Name = styled.div`
  display: flex;
  color: black;
`;

export const ChatCards = styled.div`
  flex-direction: column;
  width: 310px;
`;

export const ChatCard = styled.div`
  display: flex;
  height: 40%;
  width: 100%;
  padding: 15px;
  margin-left: 5px;
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
