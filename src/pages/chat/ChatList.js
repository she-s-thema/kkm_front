import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import User from "../../data/chatUser.json";

export const ChatList = () => {
  return (
    <div style={{ float: "right" }}>
      <ChatBox>
        <h3 style={{ marginLeft: "20px" }}>채팅</h3>
        <ChatCards>
          {User.map((data) => {
            const chatcard = (
              <Link
                key={data.id}
                to={`./${data.id}`}
                style={{ textDecoration: "none" }}
              >
                <ChatCard>
                  <ChatProfile src={data.profile} />
                  <UserInfo>
                    <ChatName>{data.name}</ChatName>
                    <ChatContent>{data.content}</ChatContent>
                  </UserInfo>
                  <ChatButton>
                    {/* {" "}
                    {data.condition === 1 ? (
                      <ChatPink>거래 전</ChatPink>
                    ) : data.condition === 2 ? (
                      <ChatBlue>거래 중</ChatBlue>
                    ) : (
                      <ChatYel>거래 완료</ChatYel>
                    )} */}
                  </ChatButton>
                </ChatCard>
              </Link>
            );
            return chatcard;
          })}
        </ChatCards>
      </ChatBox>
    </div>
  );
};

const ChatBox = styled.div`
  display: block;
  width: 330px;
  height: 520px;
  border: 1px solid #c4c4c4;
  border-top: 0px;
`;

const Name = styled.div`
  display: flex;
  color: black;
`;

const ChatCards = styled.div`
  flex-direction: column;
  width: 310px;
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
  font-weight: 400;
  font-size: 7px;
`;

const ChatName = styled.h5`
  color: black;
  font-size: 13px;
`;

// const ChatPink = styled.button`
//   border: 2px solid #ffb7d2;
//   color: #ffb7d2;
//   background-color: white;

//   width: 58px;
//   height: 25px;
//   border-radius: 80px;
//   font-size: 11px;
//   font-weight: 450;
// `;

// const ChatBlue = styled.button`
//   border: 2px solid #a5d9ff;
//   color: #a5d9ff;
//   background-color: white;
//   width: 58px;
//   height: 25px;
//   border-radius: 80px;
//   font-size: 11px;
//   font-weight: 450;
// `;

// const ChatYel = styled.button`
//   border: 2px solid #ffcc66;
//   color: #ffcc66;
//   background-color: white;
//   width: 58px;
//   height: 25px;
//   border-radius: 80px;
//   font-size: 11px;
//   font-weight: 450;
// `;

const UserInfo = styled.div`
  margin-left: 13px;
  display: block;
  width: 100%;
`;

const ChatButton = styled.div`
  display: flex;
  margin-right: 25px;
`;
