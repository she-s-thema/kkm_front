import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Header } from "../components/Header";
import { Home } from "../pages/home/Home";
import { Post } from "../pages/post/Post";
import { Mypage } from "../pages/mypage/Mypage";
import { Login } from "../pages/auth/Login";
import { Redirect } from "../pages/auth/Redirect";
import { MoreInfo } from "../pages/auth/MoreInfo";
import { ChatList } from "../pages/chat/ChatList";
import { Chat } from "../pages/chat/Chat";
import { IsLogin } from "../components/IsLogin";

export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<IsLogin />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/posting" element={<Post />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/kakao/*" element={<Redirect />} />
          <Route path="/login/moreInfo" element={<MoreInfo />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
