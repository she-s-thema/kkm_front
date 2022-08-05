import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Header } from '../components/Header';
import { Home } from '../pages/home/Home';
import { Chat } from '../pages/chat/Chat'
import { Post } from '../pages/post/Post'
import { Mypage } from '../pages/mypage/Mypage';
import { Login } from '../pages/auth/Login';
import { Redirect } from '../pages/auth/Redirect';
import { MoreInfo } from '../pages/auth/MoreInfo';

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path='/'  element={<Home />}/>
          <Route path='/chat' element={<Chat /> }/>
          <Route path='/posting' element={<Post /> }/>
          <Route path='/mypage' element={<Mypage /> }/>
          <Route path='/login' element={<Login />}/>
          <Route path='/auth/kakao/*' element={<Redirect />} />
          <Route path='/login/moreInfo' element={<MoreInfo />}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}