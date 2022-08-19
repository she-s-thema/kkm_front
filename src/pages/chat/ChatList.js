import userEvent from "@testing-library/user-event";
import React from "react";
import styled from "styled-components";
import User from "../../data/chatUser.json";

export const ChatList = () => {
  return (
    <div>
      <ChatBox>
        <ChatCards>
          {User.map((data) => {
            const chatcard = (
              <ChatCard key={data.id}>
                <ChatProfile src={data.profile} />
              </ChatCard>
            );
            return chatcard;
          })}
        </ChatCards>
      </ChatBox>
    </div>
  );
};

const ChatBox = styled.div`
  display: flex;
  width: 400px;
  height: 400px;
  border: 1px #c4c4c4;
  margin-right: 30%;
`;

const ChatCards = styled.div`
  display: flex;
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
  display: flex;
`;

const ChatProfile = styled.img`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 20px;
`;
