import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import axios from "axios";
import { Postings } from "./Postings";
import { useQuery } from "react-query";

export const Home = () => {
  const user = useRecoilValue(userInfo);
  const API_ADD = `/getPostList?lon=${user["lon"]}&lat=${user["lat"]}`;
  const getPosts = () => axios.get(API_ADD).then((data) => data["data"]);

  const postQuery = useQuery(["posts"], getPosts);

  return (
    <HomeBox>
      {postQuery.isSuccess && <Postings posts={postQuery.data} />}
    </HomeBox>
  );
};

React.memo(Home);

const HomeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
