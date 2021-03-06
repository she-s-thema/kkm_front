import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Header = () => {
  return (
    <HeaderBox>
      <Main>
        <Image alt='logo' src='https://shes-thema.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F13012d72-71b6-4653-95ca-05de21e18e80%2F%EC%9B%8C%EB%93%9C%EB%A7%88%ED%81%AC.png?table=block&id=a73b383b-775b-4cda-ad10-97f9a32d28aa&spaceId=60e632a7-8801-44ae-b321-818e1ed732e6&width=190&userId=&cache=v2'/>
          <Search placeholder='π  λ΄κ° μκ³  μΆμ μ²­μΉλ§ μ°λ¦¬ λλ€μμ λΉλ¦΄ μ μμκΉ?' />
          <Nav>
            <NavLink className="nav-item" to="/">ν</NavLink>
            <NavLink className="nav-item" to="/chat/:id">μ±ν</NavLink>
            <NavLink className="nav-item" to="/posting">κΈ μμ±</NavLink>
            <NavLink className="nav-item" to="/mypage">λ§μ΄νμ΄μ§</NavLink>
          </Nav>
      </Main>
    </HeaderBox>
  )
}

const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 100%;
`

const Image = styled.img`
  height: 3.5rem;
`;

const Search = styled.input`
  height: 1rem;
  padding: 0.5rem;
  border: none;
  background-color: #F2F2F2;
  width: 50%;
  border-radius: 5px;
  margin-left: 20px;
  &:focus {
      outline: none;
      background-color: #E3E3E3;
  }
`

const Nav = styled.div`
  display: flex;
  width: 25%;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
`