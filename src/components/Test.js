import axios from "axios";
import React, { memo } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { userInfo } from "../data/user";

export const Test = memo(() => {
  const user = useRecoilValue(userInfo);
  const API_ADD = `/post/townlist?lon=${user["lon"]}&lat=${user["lat"]}`;

  const getPosts = async () => {
    const { data } = await axios.get(API_ADD);
    return data;
  };

  const query = useQuery("posts", getPosts);
  console.log(query);

  return (
    <>
      {!query.isLoading &&
        query.data.map((data) => <h3 key={data.post_id}>{data.title}</h3>)}
    </>
  );
});
