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
        <Link to="./chat">
          <ChatCards>
            {User.map((data) => {
              const chatcard = (
                <ChatCard key={data.id}>
                  <ChatProfile src={data.profile} />
                  <ChatName>{data.name}</ChatName>
                  <ChatContent>{data.content}</ChatContent>
                  ChatButton({data.condition})
                </ChatCard>
              );
              return chatcard;
            })}
          </ChatCards>
        </Link>
      </ChatBox>
    </div>
  );
};

function ChatButton(data) {
  if (data == "거래전") {
    return <ChatPink>{data}</ChatPink>;
  } else if (data == "거래중") {
    return <ChatYel>{data}</ChatYel>;
  } else {
    return <ChatBlue>{data}</ChatBlue>;
  }
}

const ChatBox = styled.div`
  display: flex;
  width: 25%;
  height: 420px;
  border: 2px;
  background-color: #c4c4c4;
`;

const ChatCards = styled.div`
  display: block;
  width: 100%;
`;

const Profile = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 20px;
`;

const Name = styled.div`
  display: flex;
  color: black;
`;

const ChatCard = styled.div`
  display: block;
  height: 40%;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ChatProfile = styled.img`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const ChatContent = styled.h6`
  color: black;
  text-decoration: none;
`;

const ChatName = styled.h4`
  color: black;
  text-decoration: none;
`;

const ChatPink = styled.button`
  border: 1px #ffb7d2;
  color: #ffb7d2;
`;

const ChatBlue = styled.button`
  border: 1px #a5d9ff;
  color: #ffb7d2;
`;

const ChatYel = styled.button`
  border: 1px #ffcc66;
  color: #ffb7d2;
`;
