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
        >
          {/* <path
            d="M20.3712 0.986253L11 10.1213L1.62874 0.986253C1.46131 0.822711 1.23654 0.731153 1.00249 0.731153C0.768439 0.731153 0.543674 0.822711 0.37624 0.986253C0.295169 1.06569 0.230763 1.1605 0.186794 1.26513C0.142826 1.36977 0.120178 1.48213 0.120178 1.59563C0.120178 1.70913 0.142826 1.82148 0.186794 1.92612C0.230763 2.03076 0.295169 2.12557 0.37624 2.205L10.3456 11.925C10.5207 12.0957 10.7555 12.1912 11 12.1912C11.2445 12.1912 11.4793 12.0957 11.6544 11.925L21.6237 2.20688C21.7054 2.12739 21.7703 2.03234 21.8146 1.92736C21.8589 1.82237 21.8817 1.70958 21.8817 1.59563C21.8817 1.48168 21.8589 1.36888 21.8146 1.2639C21.7703 1.15891 21.7054 1.06387 21.6237 0.984377C21.4563 0.820835 21.2315 0.729279 20.9975 0.729279C20.7634 0.729279 20.5387 0.820835 20.3712 0.984377V0.986253Z"
            fill="black"
          /> */}
        </svg>
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
