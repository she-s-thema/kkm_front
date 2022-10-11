import React from "react";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import axios from "axios";
import { Postings } from "./Postings";
import { useQuery } from "react-query";
import { Layout } from "../../components/Layout";

export const Home = () => {
  const user = useRecoilValue(userInfo);
  const API_ADD = `/getPostList?lon=${user["lon"]}&lat=${user["lat"]}`;
  const getPosts = () => axios.get(API_ADD).then((data) => data["data"]);

  const postQuery = useQuery(["posts"], getPosts);

  return <>{postQuery.isSuccess && <Postings posts={postQuery.data} />}</>;
};
