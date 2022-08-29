import userEvent from "@testing-library/user-event";
import React from "react";
import { Route, Link } from "react-router-dom";
import { Chat } from "./Chat";
import styled from "styled-components";
import User from "../../data/chatUser.json";

export const ChatList = () => {
  return (
    <div>
      <ChatBox>
        <h3 style={{ marginLeft: "20px" }}>채팅</h3>
        <ChatCards>
          <Link to="./chat" style={{ textDecoration: "none" }}>
            {User.map((data) => {
              const chatcard = (
                <ChatCard key={data.id}>
                  <ChatProfile src={data.profile} />
                  <UserInfo>
                    <ChatName>{data.name}</ChatName>
                    <ChatContent>{data.content}</ChatContent>
                  </UserInfo>
                  {data.condition == 1 ? (
                    <ChatPink>거래 전</ChatPink>
                  ) : data.condition == 2 ? (
                    <ChatBlue>거래 중</ChatBlue>
                  ) : (
                    <ChatYel>거래 완료</ChatYel>
                  )}
                </ChatCard>
              );
              return chatcard;
            })}
          </Link>
        </ChatCards>
      </ChatBox>
    </div>
  );
};

const ChatBox = styled.div`
  display: block;
  width: 320px;
  height: 520px;
  border: 2px solid #c4c4c4;
  border-top: 0px;
`;

const Name = styled.div`
  display: flex;
  color: black;
`;

const ChatCards = styled.div`
  flex-direction: column;
`;

const ChatCard = styled.div`
  display: flex;
  height: 40%;
  width: 100%;
  padding: 15px;
  margin-left: 5px;
`;

const ChatProfile = styled.img`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const ChatContent = styled.h6`
  color: #404040;
  text-decoration: none;
  text-decoration-style: none;
`;

const ChatName = styled.h5`
  color: black;
`;

const ChatPink = styled.button`
  border: 2px solid #ffb7d2;
  color: #ffb7d2;
  background-color: white;
  width: 65px;
  height: 28px;
  border-radius: 80px;
  font-size: 12px;
`;

const ChatBlue = styled.button`
  border: 2px solid #a5d9ff;
  color: #a5d9ff;
  background-color: white;
  width: 65px;
  height: 28px;
  border-radius: 80px;
  font-size: 12px;
`;

const ChatYel = styled.button`
  border: 2px solid #ffcc66;
  color: #ffcc66;
  background-color: white;
  width: 65px;
  height: 28px;
  border-radius: 80px;
  font-size: 12px;
`;

const UserInfo = styled.div`
  margin-left: 13px;
  display: block;
`;
