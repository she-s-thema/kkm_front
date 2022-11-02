import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfo } from "../../data/user";

export const UserLocation = () => {
  const ggmInfo = useRecoilValue(userInfo);
  return (
    <LocationBox>
      <Text>
        최근<b> {ggmInfo["nickname"]}</b>님의 동네
        <b> {ggmInfo["address"]} </b>
        <svg
          width="15"
          height="13"
          viewBox="0 0 22 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </Text>
    </LocationBox>
  );
};

const LocationBox = styled.div`
  margin: 15px 0;
`;

const Text = styled.span`
  font-size: 130%;
`;
