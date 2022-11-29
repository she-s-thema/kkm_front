import styled from "styled-components";

export const Frame = styled.div`
  display: flex;
  width: 40%;
  height: 100%;
  align-items: center;
  padding: 2% 5% 2% 5%;
  background-color: white;
  flex-direction: column;
  row-gap: 20px;
`;

export const Banner = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
  align-items: center;
  font-weight: 500;
  align-items: center;
  column-gap: 7px;
  span {
    height: 26px;
  }
`;

export const BannerIcon = styled.img`
  height: 100%;
  object-fit: contain;
`;
