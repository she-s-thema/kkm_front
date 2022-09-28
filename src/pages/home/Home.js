import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import axios from "axios";
import { Postings } from "./Postings";

export const Home = () => {
  const user = useRecoilValue(userInfo);
  const API_ADD = `/getPostList?lon=${user["lon"]}&lat=${user["lat"]}`;
  const [posts, setPosts] = useState("");
  const getPosts = async () => {
    await axios.get(API_ADD).then((data) => {
      setPosts(() => data["data"]);
    });
  };

  useMemo(() => getPosts, [posts]);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <HomeBox>
      <Postings posts={posts} />
    </HomeBox>
  );
};

React.memo(Home);

const HomeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
