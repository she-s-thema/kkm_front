import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { channelId } from "../../data/chat";
import { Channels } from "./channels";
import { Chat } from "./chat";

export const Chatting = () => {
  const [sChannelId, setSChannelId] = useRecoilState(channelId);
  return (
    <Frame>
      <Channels changeChId={(ch) => setSChannelId(ch)} clickedCh={sChannelId} />
      {sChannelId && <Chat ch_id={sChannelId} />}
    </Frame>
  );
};

const Frame = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-between;
`;
