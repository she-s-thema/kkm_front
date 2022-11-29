import React from "react";
import { useRef } from "react";
import { useState } from "react";
import * as S from "./jjam.style";

export const JjamList = ({ list }) => {
  const [more, setMore] = useState(false);
  const btnRef = useRef(null);
  return (
    <>
      <S.List>
        {list && !more
          ? list.slice(0, 4).map((data) => (
              <S.Card
                key={data.post_id}
                onClick={() => (window.location.href = `/post/${data.post_id}`)}
              >
                <S.Image src={data.image_1} />
              </S.Card>
            ))
          : list.map((data) => (
              <S.Card
                key={data.post_id}
                onClick={() => (window.location.href = `/post/${data.post_id}`)}
              >
                <S.Image src={data.image_1} />
              </S.Card>
            ))}
      </S.List>
      <S.MoreBtn ref={btnRef} onClick={() => setMore((prev) => !prev)}>
        {more ? "접기" : "더보기"}
      </S.MoreBtn>
    </>
  );
};
