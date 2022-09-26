import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Header } from "../components/Header";
import { Post } from "../pages/post/Post";
import { Mypage } from "../pages/mypage/Mypage";
import { Login } from "../pages/auth/Login";
import { Redirect } from "../pages/auth/Redirect";
import { MoreInfo } from "../pages/auth/MoreInfo";
import { ChatList } from "../pages/chat/ChatList";
import { IsLogin } from "../components/IsLogin";
import { PostDetail } from "../pages/home/PostDetail";
import { Chat } from "../pages/chat/Chat";
import { Test } from "../components/Test";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<IsLogin />} />
            <Route path="/chat" element={<ChatList />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/posting" element={<Post />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/kakao/*" element={<Redirect />} />
            <Route path="/login/moreInfo" element={<MoreInfo />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
