import userEvent from "@testing-library/user-event";
import React from "react";
import styled from "styled-components";
import User from "../../data/currentUser.json";

export const Chat = () => {
  return (
    <div>
      <ChatBox>
        <ChatHead>
          <Profile src={User.profile} />
          <Name>{User.name}</Name>
        </ChatHead>
      </ChatBox>
    </div>
  );
};

const ChatBox = styled.div`
  display: flex;
  height: 400px;
  width: 400px;
  border: 1px #c4c4c4;
`;

const ChatHead = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin-right: 30%;
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
