import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  const goHome = () => (window.location.href = "/");

  return (
    <HeaderBox>
      <Main>
        <Image
          onClick={goHome}
          alt="logo"
          src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F48fb3ffd-bab6-434b-afaa-ae968aacc848%2F1.png?table=block&id=f044398c-b3c1-4e96-a1ff-70e29742482e&spaceId=60e632a7-8801-44ae-b321-818e1ed732e6&width=250&userId=c84a84af-878e-43bd-84c5-2229118608d7&cache=v2"
        />
        <Search placeholder="🔍  내가 입고 싶은 청치마 우리 동네에서 빌릴 수 있을까?" />
        <Nav>
          <NavLink className="nav-item" to="/">
            홈
          </NavLink>
          <NavLink className="nav-item" to="/chat">
            채팅
          </NavLink>
          <NavLink className="nav-item" to="/posting">
            글 작성
          </NavLink>
          <NavLink className="nav-item" to="/mypage">
            마이페이지
          </NavLink>
        </Nav>
      </Main>
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: 0.5px solid gray;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
`;

const Image = styled.img`
  height: 2.5rem;
`;

const Search = styled.input`
  height: 1rem;
  padding: 0.5rem;
  border: none;
  background-color: #f2f2f2;
  width: 50%;
  border-radius: 5px;
  margin-left: 20px;
  &:focus {
    outline: none;
    background-color: #e3e3e3;
  }
`;

const Nav = styled.div`
  display: flex;
  width: 25%;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
`;
