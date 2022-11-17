import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Header } from "../components/Header";
import { Post } from "../pages/post/Post";
import { Mypage } from "../pages/mypage/Mypage";
import { IsLogin } from "../components/IsLogin";
import { PostDetail } from "../pages/home/detail";
import { QueryClient, QueryClientProvider } from "react-query";
import { Login } from "../pages/auth/login";
import { Redirect } from "../pages/auth/redirect";
import { MoreInfo } from "../pages/auth/moreInfo";
import { Layout } from "../components/Layout";
import { Chatting } from "../pages/chat";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Layout>
            <Routes>
              <Route exact path="/" element={<IsLogin />} />
              <Route path="/chat" element={<Chatting />} />
              <Route path="/posting" element={<Post />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/kakao/*" element={<Redirect />} />
              <Route path="/login/moreInfo" element={<MoreInfo />} />
              <Route path="/post/:post_id" element={<PostDetail />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
