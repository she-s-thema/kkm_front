import React from 'react'
import { NavLink } from 'react-router-dom'
import * as S from "./style";

export const Header = () => {
  return (
    <S.Header>
      <S.HeaderBox>
        <S.Image alt='logo' src='https://shes-thema.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F13012d72-71b6-4653-95ca-05de21e18e80%2F%EC%9B%8C%EB%93%9C%EB%A7%88%ED%81%AC.png?table=block&id=a73b383b-775b-4cda-ad10-97f9a32d28aa&spaceId=60e632a7-8801-44ae-b321-818e1ed732e6&width=190&userId=&cache=v2'/>
          <S.Search placeholder='🔍  내가 입고 싶은 청치마 우리 동네에서 빌릴 수 있을까?' />
          <S.Nav>
            <NavLink className="nav-item" to="/">홈</NavLink>
            <NavLink className="nav-item" to="/chat/:id">채팅</NavLink>
            <NavLink className="nav-item" to="/posting">글 작성</NavLink>
            <NavLink className="nav-item" to="/mypage">마이페이지</NavLink>
          </S.Nav>
      </S.HeaderBox>
    </S.Header>
  )
}