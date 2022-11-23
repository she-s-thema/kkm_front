import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import { Postings } from "./postings";
import { useMutation, useQuery } from "react-query";
import { CustomAxios } from "../../utils/customAxios";
import { useInView } from "react-intersection-observer";
import { Loader } from "../../components/Loader";

export const Home = () => {
  const user = useRecoilValue(userInfo);
  const [ref, inView] = useInView({ threshold: 0 });
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState(false);
  const API_ADD = `/getPostList?lon=${user["lon"]}&lat=${
    user["lat"]
  }&start=${count}&end=${count + 9}`;

  const getPosts = async () => {
    setCount((prev) => prev + 9);
    const res = await CustomAxios.get(API_ADD);
    if (posts) {
      setPosts((prev) => [...prev, ...res.data]);
    } else {
      setPosts(res.data);
    }
    return res.data;
  };

  const postQuery = useQuery(["posts"], getPosts);

  useEffect(() => {
    if (inView) {
      if (count <= posts.length) getPosts();
    }
  }, [inView]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      inView={inView}
    >
      {postQuery.isSuccess ? (
        <>
          <Postings posts={posts} />
          <div ref={ref} style={{ marginTop: "-40%" }}></div>
        </>
      ) : null}
    </div>
  );
};
