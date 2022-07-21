import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Header } from '../components/Header';
import { Home } from '../pages/home/Home';
import { Chat } from '../pages/chat/Chat'
import { Post } from '../pages/post/Post'
import { Mypage } from '../pages/mypage/Mypage';

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/'  element={<Home />}/>
          <Route path='/chat' element={<Chat /> }/>
          <Route path='/posting' element={<Post /> }/>
          <Route path='/mypage' element={<Mypage /> }/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}