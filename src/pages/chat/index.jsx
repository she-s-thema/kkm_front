import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Channels } from "./channels";
import { Chat } from "./chat";

export const Chatting = () => {
  const [clickedChId, setClickedChId] = useState();

  return (
    <Frame>
      <Channels
        changeChId={(ch) => {
          setClickedChId(ch);
        }}
        clickedCh={clickedChId}
      />
      {clickedChId && <Chat ch_id={clickedChId} />}
    </Frame>
  );
};

const Frame = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
`;
